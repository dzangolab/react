import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { SignupForm, login, useUser } from "..";
import { useConfig } from "../hooks";
import {
  useAcceptInvitationMutation,
  useGetInvitationByTokenQuery,
} from "../redux/usersApi";

import type { LoginCredentials } from "..";

const AcceptInvitation = () => {
  const { t } = useTranslation("user");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const { token } = useParams();
  const {
    user: { invitations },
  } = useConfig();

  const [acceptInvitation, { isLoading: acceptInvitationLoading }] =
    useAcceptInvitationMutation();

  const { isLoading, data, isError } = useGetInvitationByTokenQuery({
    url: invitations?.endpoints?.singleInvitation + (token || ""),
  });

  const handleSubmit = async (credentials: LoginCredentials) => {
    if (!token) {
      return;
    }

    const response = await acceptInvitation({
      url: invitations?.endpoints?.singleInvitation + (token || ""),
      credentials,
    });

    if ("error" in response) {
      toast.error(`${t("invitations.errors.errorAcceptingInvitation")}`);
    } else if (response?.data?.status === "ERROR") {
      toast.error(response.data.message);
    } else {
      setLoginLoading(true);

      await login(credentials)
        .then(async (result) => {
          if (result?.user) {
            await setUser(result.user);
            toast.success(`${t("login.messages.success")}`);
          }
        })
        .catch(async (error) => {
          const errorMessage = t("errors:errors.otherErrors");

          if (error.name) {
            throw error as Error;
          }

          toast.error(error.message || errorMessage);
        })
        .finally(() => {
          setLoginLoading(false);
        });
    }
  };

  return (
    <Page
      className="signup"
      title={t("signup.title")}
      loading={isLoading || loginLoading}
    >
      {isError || !data ? (
        <Card>
          <p>{t(`invitations.errors.errorFetchingInvitation`)}</p>
        </Card>
      ) : (
        <SignupForm
          key={data?.id}
          email={data?.email || ""}
          handleSubmit={handleSubmit}
          loading={acceptInvitationLoading}
        />
      )}
    </Page>
  );
};

export default AcceptInvitation;

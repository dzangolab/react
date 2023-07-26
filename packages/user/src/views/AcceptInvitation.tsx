import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { SignupForm, login, useUser } from "..";
import {
  useAcceptInvitationMutation,
  useGetInvitationByTokenQuery,
} from "../redux/invitationSlice";

import type { LoginCredentials } from "..";

const AcceptInvitation = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const { token } = useParams();

  const [acceptInvitation] = useAcceptInvitationMutation();
  const { isLoading, data } = useGetInvitationByTokenQuery({
    token: token || "",
  });

  const handleSubmit = async (credentials: LoginCredentials) => {
    if (!token) {
      return;
    }

    const response = await acceptInvitation({ token, ...credentials });

    if ("error" in response) {
      console.log(response);
    } else {
      setLoading(true);

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
          setLoading(false);
        });
    }
  };

  return (
    <Page className="signup" title={t("signup.title")} loading={isLoading}>
      <SignupForm
        key={data?.id}
        email={data?.email || ""}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Page>
  );
};

export default AcceptInvitation;

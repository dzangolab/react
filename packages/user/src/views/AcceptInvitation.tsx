import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { acceptInvitation, getInvitationByToken } from "@/api/invitation";
import SignupForm from "@/components/SignupForm";
import { useConfig, useUser } from "@/hooks";
import { Invitation, LoginCredentials } from "@/types";

import { login } from "..";

const AcceptInvitation = () => {
  const { t } = useTranslation("user");

  const appConfig = useConfig();
  const { token } = useParams();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [invitation, setInvitation] = useState<Invitation | null>(null);

  const [acceptInvitationLoading, setAcceptInvitationLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (token) {
      getInvitationByToken(token, appConfig?.apiBaseUrl || "")
        .then((response) => {
          if ("data" in response && response.data.status === "ERROR") {
            // TODO better handle errors
            setIsError(true);
          } else {
            setInvitation(response as Invitation);
          }
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = (credentials: LoginCredentials) => {
    if (!token) {
      return;
    }

    setAcceptInvitationLoading(true);

    acceptInvitation(token, credentials, appConfig?.apiBaseUrl || "")
      .then((response) => {
        setAcceptInvitationLoading(false);

        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(response.data.message);
        } else {
          setLoginLoading(true);

          // TODO acceptInvitation should return authenticated user from api
          login(credentials)
            .then((result: any) => {
              if (result?.user) {
                setUser(result.user);
                toast.success(`${t("login.messages.success")}`);
              }
            })
            .catch((error: any) => {
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
      })
      .catch(() => {
        setAcceptInvitationLoading(false);
        toast.error(`${t("invitations.errors.errorAcceptingInvitation")}`);
      });
  };

  const renderPageContent = () => {
    if (isError || !invitation) {
      return (
        <Card>
          <p>{t(`invitations.errors.errorFetchingInvitation`)}</p>
        </Card>
      );
    }

    if (
      invitation?.acceptedAt ||
      invitation?.revokedAt ||
      invitation?.expiresAt < Date.now()
    ) {
      return (
        <Card>
          <p>{t(`invitation.invalid.message`)}</p>
        </Card>
      );
    }

    return (
      <SignupForm
        key={invitation.id}
        email={invitation.email || ""}
        handleSubmit={handleSubmit}
        loading={acceptInvitationLoading}
      />
    );
  };

  return (
    <Page
      className="signup"
      title={t("signup.title")}
      loading={loading || loginLoading}
    >
      {renderPageContent()}
    </Page>
  );
};

export default AcceptInvitation;

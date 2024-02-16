import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import { Card } from "primereact/card";

import SignupForm from "@/components/SignupForm";
import { useAcceptInvitation } from "@/hooks";
import { LoginCredentials } from "@/types";

export const AcceptInvitation = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const { t } = useTranslation("invitations");

  const [
    invitation,
    acceptInvitation,
    { isError, isFetching, isLoading, isLoginLoading },
  ] = useAcceptInvitation();

  const handleSubmit = async (credentials: LoginCredentials) => {
    await acceptInvitation(credentials);
  };

  const renderPageContent = () => {
    if (isError || !invitation) {
      return (
        <Card>
          <p>{t(`invitations.messages.errorFetchingInvitation`)}</p>
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
          <p>{t(`invitations.messages.invalidInvitation`)}</p>
        </Card>
      );
    }

    return (
      <SignupForm
        key={invitation.id}
        email={invitation.email || ""}
        handleSubmit={handleSubmit}
        loading={isLoading}
      />
    );
  };

  return (
    <AuthPage
      className="signup"
      title={t("user:signup.title")}
      centered={centered}
      loading={isFetching || isLoginLoading}
    >
      {renderPageContent()}
    </AuthPage>
  );
};

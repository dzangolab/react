import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmailVerification from "supertokens-web-js/recipe/emailverification";

// import { ROUTES } from "../constants";
// import { useConfig } from "../hooks";

const VerifyEmail = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);

  useEffect(() => {
    setVerifyEmailLoading(true);

    EmailVerification.verifyEmail()
      .then((response) => {
        // console.log("email verification response", response);

        setVerifyEmailLoading(false);

        if (response?.status === "OK") {
          toast.success(`${t("emailVerification.messages.success")}`);

          setLoading(false);
        } else if (
          response?.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"
        ) {
          toast.success(`${t("emailVerification.messages.invalidToken")}`);
          setLoading(false);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderPageContent = () => {
    if (isError) {
      return (
        <Card>
          <p>
            {t(`emailVerification.messages.errorFetchingEmailVerification`)}
          </p>
        </Card>
      );
    }

    return (
      <Card>
        <p>{t(`invitation.messages.invalidInvitation`)}</p>
      </Card>
    );
  };

  return (
    <Page
      className="reset-password"
      title={t("emailVerification.title")}
      loading={loading || verifyEmailLoading}
    >
      {renderPageContent()}
    </Page>
  );
};

export default VerifyEmail;

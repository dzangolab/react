import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import verifyEmail from "@/supertokens/verifyEmail";

const VerifyEmail = () => {
  const { t } = useTranslation("user");
  const [isError, setIsError] = useState(false);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);

  useEffect(() => {
    setVerifyEmailLoading(true);

    verifyEmail()
      .then((response) => {
        setVerifyEmailLoading(false);

        if (response) {
          setVerifyEmailLoading(false);

          if (response.status === "OK") {
            toast.success(`${t("emailVerification.messages.success")}`);

            setVerifyEmailLoading(false);
          } else if (response.status === "EMAIL_ALREADY_VERIFIED") {
            toast.info(`${t("emailVerification.messages.alreadyVerified")}`);

            setVerifyEmailLoading(false);
          } else {
            toast.error(`${t("emailVerification.messages.invalidToken")}`);

            setVerifyEmailLoading(false);
          }
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setVerifyEmailLoading(false);
      });
  }, []);

  const renderPageContent = () => {
    if (isError) {
      return (
        <Card>
          <p>{t(`emailVerification.messages.error`)}</p>
        </Card>
      );
    }

    return (
      <Card>
        <p>{t(`emailVerification.messages.success`)}</p>
      </Card>
    );
  };

  return (
    <Page
      className="verify-email"
      title={t("emailVerification.title")}
      loading={verifyEmailLoading}
    >
      {renderPageContent()}
    </Page>
  );
};

export default VerifyEmail;

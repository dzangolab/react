import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import verifyEmail from "@/supertokens/verifyEmail";

const VerifyEmail = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);

  useEffect(() => {
    setVerifyEmailLoading(true);

    verifyEmail()
      .then((response) => {
        setVerifyEmailLoading(false);

        if (response) {
          setVerifyEmailLoading(false);

          if (response.status === "OK") {
            toast.success(`${t("emailVerification.messages.success")}`);

            setLoading(false);
          } else if (response.status === "EMAIL_ALREADY_VERIFIED") {
            toast.info(`${t("emailVerification.messages.alreadyVerified")}`);

            setLoading(false);
          } else {
            toast.error(`${t("emailVerification.messages.invalidToken")}`);

            setLoading(false);
          }
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
          <p>{t(`emailVerification.messages.error`)}</p>
        </Card>
      );
    }

    return (
      <Card>
        <p>{t(`emailVerification.messages.invalidToken`)}</p>
      </Card>
    );
  };

  return (
    <Page
      className="verify-email"
      title={t("emailVerification.title")}
      loading={loading || verifyEmailLoading}
    >
      {renderPageContent()}
    </Page>
  );
};

export default VerifyEmail;

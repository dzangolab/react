import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import verifyEmail from "@/supertokens/verifyEmail";

const VerifyEmail = () => {
  const { t } = useTranslation("user");
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
  const [verifyStatus, setVerifyStatus] = useState<string>("");

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
            setVerifyStatus("OK");
          } else if (response.status === "EMAIL_ALREADY_VERIFIED") {
            toast.info(`${t("emailVerification.messages.alreadyVerified")}`);

            setVerifyEmailLoading(false);
            setVerifyStatus("EMAIL_ALREADY_VERIFIED");
          } else {
            toast.error(`${t("emailVerification.messages.invalidToken")}`);

            setVerifyEmailLoading(false);
            setVerifyStatus("INVALID_TOKEN");
          }
        }
      })
      .catch(() => {
        setVerifyStatus("ERROR");
      })
      .finally(() => {
        setVerifyEmailLoading(false);
      });
  }, []);

  const renderPageContent = () => {
    if (verifyStatus === "ERROR") {
      return (
        <Card>
          <p>{t(`emailVerification.messages.error`)}</p>
        </Card>
      );
    } else {
      if (verifyStatus === "EMAIL_ALREADY_VERIFIED")
        return (
          <Card>
            <p>{t(`emailVerification.messages.alreadyVerified`)}</p>
          </Card>
        );
      if (verifyStatus === "INVALID_TOKEN") {
        return (
          <Card>
            <p>{t(`emailVerification.messages.invalidToken`)}</p>
          </Card>
        );
      }
      return (
        <Card>
          <p>{t(`emailVerification.messages.success`)}</p>
        </Card>
      );
    }
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

import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import verifyEmail from "@/supertokens/verifyEmail";

const VerifyEmail = () => {
  const { t } = useTranslation("user");
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

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
            setMessage(t("emailVerification.messages.success"));
          } else if (response.status === "EMAIL_ALREADY_VERIFIED") {
            toast.info(`${t("emailVerification.messages.alreadyVerified")}`);

            setVerifyEmailLoading(false);
            setMessage(t("emailVerification.messages.alreadyVerified"));
          } else {
            toast.error(`${t("emailVerification.messages.invalidToken")}`);

            setVerifyEmailLoading(false);
            setMessage(t("emailVerification.messages.invalidToken"));
          }
        }
      })
      .catch(() => {
        setVerifyEmailLoading(false);
        setMessage(t("emailVerification.messages.error"));
      })
      .finally(() => {
        setVerifyEmailLoading(false);
      });
  }, []);

  return (
    <Page
      className="verify-email"
      title={t("emailVerification.title")}
      loading={verifyEmailLoading}
    >
      <Card>{message}</Card>
    </Page>
  );
};

export default VerifyEmail;

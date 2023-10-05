import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import verifyEmail from "@/supertokens/verifyEmail";

import { UserContextType, useUser, userContext } from "..";

const VerifyEmail = () => {
  const { t } = useTranslation("user");
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { user } = useContext(userContext) as UserContextType;
  const { setUser } = useUser();

  useEffect(() => {
    setVerifyEmailLoading(true);

    verifyEmail()
      .then((response) => {
        setVerifyEmailLoading(false);

        if (response) {
          setVerifyEmailLoading(false);

          if (response.status === "OK") {
            toast.success(`${t("emailVerification.messages.success")}`);

            setUser(user);
            setVerifyEmailLoading(false);

            setMessage(t("emailVerification.messages.success"));
          } else if (response.status === "EMAIL_ALREADY_VERIFIED") {
            toast.info(`${t("emailVerification.messages.alreadyVerified")}`);

            setUser(user);
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
        toast.error(`${t("emailVerification.messages.error")}`);

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

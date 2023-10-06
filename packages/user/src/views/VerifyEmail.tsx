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
  const [status, setStatus] = useState<string | undefined>("");
  const { user } = useContext(userContext) as UserContextType;
  const { setUser } = useUser();

  useEffect(() => {
    setVerifyEmailLoading(true);

    verifyEmail()
      .then((response) => {
        setVerifyEmailLoading(true);

        if (response) {
          setStatus(response.status);
          switch (response.status) {
            case "OK":
              toast.success(t("emailVerification.messages.success"));
              setUser(user);
              break;
            case "EMAIL_ALREADY_VERIFIED":
              toast.info(t("emailVerification.messages.alreadyVerified"));
              setUser(user);
              break;
            default:
              toast.error(t("emailVerification.messages.invalidToken"));
              break;
          }
        }
      })
      .catch(() => {
        toast.error(`${t("emailVerification.messages.error")}`);
        setStatus("ERROR");
      })
      .finally(() => {
        setVerifyEmailLoading(false);
      });
  }, []);

  const renderMessage = () => {
    switch (status) {
      case "OK":
        return t("emailVerification.messages.success");
      case "EMAIL_ALREADY_VERIFIED":
        return t("emailVerification.messages.alreadyVerified");
      case "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR":
        return t("emailVerification.messages.invalidToken");
      default:
        return t("emailVerification.messages.error");
    }
  };

  return (
    <Page
      className="email-verification"
      title={t("emailVerification.title")}
      loading={verifyEmailLoading}
    >
      <Card>{renderMessage()}</Card>
    </Page>
  );
};

export default VerifyEmail;

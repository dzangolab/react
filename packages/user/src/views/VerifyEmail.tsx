import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import verifyEmail from "@/supertokens/verifyEmail";

import { UserContextType, userContext } from "..";

const VerifyEmail = ({
  redirectionDelayTime = 5,
}: {
  redirectionDelayTime?: number;
}) => {
  const { t } = useTranslation("user");
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | undefined>("");
  const { user, setUser } = useContext(userContext) as UserContextType;
  const navigate = useNavigate();
  const [second, setSecond] = useState<number>(redirectionDelayTime);

  useEffect(() => {
    setVerifyEmailLoading(true);

    verifyEmail()
      .then((response) => {
        if (response) {
          setStatus(response.status);

          switch (response.status) {
            case "OK":
              toast.success(t("emailVerification.toastMessages.success"));
              break;

            case "EMAIL_ALREADY_VERIFIED":
              toast.info(t("emailVerification.toastMessages.alreadyVerified"));
              break;

            default:
              toast.error(t("emailVerification.toastMessages.invalidToken"));
              break;
          }
        }
      })
      .catch(() => {
        toast.error(`${t("emailVerification.toastMessages.error")}`);
        setStatus("ERROR");
      })
      .finally(() => {
        setVerifyEmailLoading(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(second);
      if (second > 0) {
        setSecond((previous) => previous - 1);
      }
    }, 1000);
    if (second === 0) {
      setUser(user);
      navigate("/");
    }
  }, [second]);

  const renderMessage = () => {
    switch (status) {
      case "OK":
        return t("emailVerification.messages.success", { second: second });

      case "EMAIL_ALREADY_VERIFIED":
        return t("emailVerification.messages.alreadyVerified", {
          second: second,
        });

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

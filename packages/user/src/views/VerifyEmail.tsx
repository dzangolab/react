import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import verifyEmail from "@/supertokens/verifyEmail";

import { UserContextType, userContext } from "..";

const VerifyEmail = () => {
  const { t } = useTranslation("user");
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | undefined>("");
  const { user, setUser } = useContext(userContext) as UserContextType;
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState<number>(5);

  useEffect(() => {
    setVerifyEmailLoading(true);

    verifyEmail()
      .then((response) => {
        if (response) {
          setStatus(response.status);

          switch (response.status) {
            case "OK":
              toast.success(t("emailVerification.messages.success"));
              redirectToHomePageAfterDelay();

              break;

            case "EMAIL_ALREADY_VERIFIED":
              toast.info(t("emailVerification.messages.alreadyVerified"));
              redirectToHomePage();
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

  const redirectToHomePageAfterDelay = () => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalId);
      }
      redirectToHomePage();
    }, 1000);
  };

  const redirectToHomePage = () => {
    setUser(user);
    navigate("/");
  };

  const renderMessage = () => {
    switch (status) {
      case "OK":
        return t("emailVerification.messages.success", { second: seconds });

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

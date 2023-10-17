import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resendEmail } from "@/supertokens/resend-email-verification";
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
  const [countdown, setCountdown] = useState<number>(redirectionDelayTime);

  useEffect(() => {
    if (user) {
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
                toast.info(
                  t("emailVerification.toastMessages.alreadyVerified"),
                );
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
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown((previous) => previous - 1);
      }, 1000);
    } else if (
      countdown === 0 &&
      (status === "OK" || status === "EMAIL_ALREADY_VERIFIED")
    ) {
      setUser(user);
      navigate("/");
    }
  }, [countdown]);

  const handleResend = () => {
    resendEmail(t);
    navigate("/verify-email-reminder");
  };

  const renderMessage = () => {
    if (!user) {
      return (
        <>
          <div>{t("emailVerification.messages.login")}</div>
          <div className="signin-button-wrapper">
            <Button
              label={t("emailVerification.messages.button.login")}
              onClick={() => navigate("/signin")}
            />
          </div>
        </>
      );
    }

    switch (status) {
      case "OK":
        return t("emailVerification.messages.success", {
          countdown: countdown,
        });

      case "EMAIL_ALREADY_VERIFIED":
        return t("emailVerification.messages.alreadyVerified", {
          countdown: countdown,
        });

      case "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR":
        return (
          <>
            <div>{t("emailVerification.messages.invalidToken")}</div>
            <div className="resend-email-button-wrapper">
              <Button
                label={t("emailVerification.messages.invalidToken.button")}
                onClick={handleResend}
              />
            </div>
          </>
        );

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

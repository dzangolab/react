import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { EMAIL_VERIFICATION } from "@/constants";
import { resendEmail } from "@/supertokens/resend-email-verification";
import verifyEmail from "@/supertokens/verify-email";

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
  const [countdown, setCountdown] = useState<number>(-1);

  useEffect(() => {
    if (user) {
      setVerifyEmailLoading(true);

      verifyEmail()
        .then((response) => {
          if (response) {
            setStatus(response.status);

            switch (response.status) {
              case EMAIL_VERIFICATION.OK:
                toast.success(t("emailVerification.toastMessages.success"));
                setCountdown(redirectionDelayTime);
                break;

              case EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED:
                toast.info(
                  t("emailVerification.toastMessages.alreadyVerified"),
                );
                setCountdown(redirectionDelayTime);
                break;

              default:
                toast.error(t("emailVerification.toastMessages.invalidToken"));
                break;
            }
          }
        })
        .catch(() => {
          toast.error(`${t("emailVerification.toastMessages.error")}`);
          setStatus(EMAIL_VERIFICATION.ERROR);
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
      (status === EMAIL_VERIFICATION.OK ||
        status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED)
    ) {
      setUser(user);
      navigate("/");
    }
  }, [countdown]);

  const handleResend = () => {
    resendEmail()
      .then((status) => {
        if (status === EMAIL_VERIFICATION.OK) {
          toast.success(t("emailVerification.toastMessages.resendSuccess"));
        } else if (status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED_ERROR) {
          toast.info(t("emailVerification.toastMessages.alreadyVerified"));
        }

        navigate("/verify-email-reminder");
      })
      .catch(() => {
        toast.error(t("emailVerification.toastMessages.error"));
      });
  };

  const handleRedirect = () => {
    const urlParameters = new URLSearchParams(window.location.search);
    if (urlParameters) {
      navigate(
        `/signin?redirect=${window.encodeURI(
          location.pathname + location.search,
        )}`,
      );
    }
  };

  const renderMessage = () => {
    if (!user) {
      return (
        <>
          <div className="message-wrapper">
            {t("emailVerification.messages.unauthenticated")}
          </div>
          <div className="button-wrapper">
            <Button
              label={t("emailVerification.button.signin")}
              onClick={handleRedirect}
              className="signin-button"
            />
          </div>
        </>
      );
    }

    switch (status) {
      case EMAIL_VERIFICATION.OK:
        return (
          <div className="message-wrapper">
            {t("emailVerification.messages.success", {
              countdown: countdown,
            })}
          </div>
        );

      case EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED:
        return (
          <div className="message-wrapper">
            {t("emailVerification.messages.alreadyVerified", {
              countdown: countdown,
            })}
          </div>
        );

      case EMAIL_VERIFICATION.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR:
        return (
          <>
            <div className="message-wrapper">
              {t("emailVerification.messages.invalidToken")}
            </div>
            <div className="button-wrapper">
              <Button
                label={t("emailVerification.button.invalidToken")}
                onClick={handleResend}
                className="resend-button"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="message-wrapper">
            {t("emailVerification.messages.error")};
          </div>
        );
    }
  };

  return (
    <Page
      className="email-verification"
      title={t("emailVerification.title")}
      loading={verifyEmailLoading}
    >
      <Card className="email-verification-card">{renderMessage()}</Card>
    </Page>
  );
};

export default VerifyEmail;

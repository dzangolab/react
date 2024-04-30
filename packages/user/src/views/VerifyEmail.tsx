import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage, Button } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { EMAIL_VERIFICATION } from "@/constants";
import { useConfig } from "@/hooks";
import { resendVerificationEmail } from "@/supertokens/resend-email-verification";
import verifyEmail from "@/supertokens/verify-email";

import { UserContextType, userContext } from "..";

export const VerifyEmail = ({
  redirectionDelayTime = 5,
  centered = true,
}: {
  redirectionDelayTime?: number;
  centered?: boolean;
}) => {
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | undefined>("");
  const [countdown, setCountdown] = useState<number>(-1);

  const { t } = useTranslation("user");
  const { user, setUser } = useContext(userContext) as UserContextType;
  const navigate = useNavigate();
  const { user: userConfig } = useConfig();

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

                setUser(user);

                // setCountdown(redirectionDelayTime);
                break;

              case EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED:
                toast.info(
                  t("emailVerification.toastMessages.alreadyVerified"),
                );

                setUser(user);

                // setCountdown(redirectionDelayTime);
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

  // FIXME [SM: the use of setTimeout with hook is not optimized]
  // useEffect(() => {
  //   if (countdown > 0) {
  //     setTimeout(() => {
  //       setCountdown((previous) => previous - 1);
  //     }, 1000);
  //   } else if (
  //     countdown === 0 &&
  //     (status === EMAIL_VERIFICATION.OK ||
  //       status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED)
  //   ) {
  //     setUser(user);
  //     navigate("/");
  //   }
  // }, [countdown]);

  const handleResend = () => {
    resendVerificationEmail()
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
        `/${
          userConfig.routes?.login?.path || "signin"
        }?redirect=${window.encodeURI(location.pathname + location.search)}`,
      );
    }
  };

  const renderMessage = () => {
    if (verifyEmailLoading) {
      return (
        <div className="message-wrapper">
          {t("emailVerification.messages.verifyingEmail")}
        </div>
      );
    }

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

    let message = "",
      button = <></>;

    switch (status) {
      case EMAIL_VERIFICATION.OK:
        message = t("emailVerification.messages.success", {
          countdown: countdown,
        });

        break;

      case EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED:
        message = t("emailVerification.messages.alreadyVerified", {
          countdown: countdown,
        });

        break;

      case EMAIL_VERIFICATION.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR:
        message = t("emailVerification.messages.invalidToken");

        button = (
          <div className="button-wrapper">
            <Button
              label={t("emailVerification.button.resendEmail")}
              onClick={handleResend}
              className="resend-button"
            />
          </div>
        );

        break;

      default:
        message = t("emailVerification.messages.error");
    }

    return (
      <>
        <div className="message-wrapper">{message}</div>
        {button}
      </>
    );
  };

  return (
    <AuthPage
      className="email-verification"
      title={t("emailVerification.title")}
      loading={verifyEmailLoading}
      centered={centered}
    >
      <Card className="email-verification-card">{renderMessage()}</Card>
    </AuthPage>
  );
};

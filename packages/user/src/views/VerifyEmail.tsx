import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage, Button } from "@dzangolab/react-ui";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { EMAIL_VERIFICATION } from "@/constants";
import { verifyEmail } from "@/supertokens";
import { resendVerificationEmail } from "@/supertokens/resend-email-verification";

import { UserContextType, userContext } from "..";

export const VerifyEmail = ({ centered = true }: { centered?: boolean }) => {
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string | undefined>("");

  const { t } = useTranslation("user");
  const { user, setUser } = useContext(userContext) as UserContextType;

  useEffect(() => {
    if (user) {
      verifyEmail()
        .then((response) => {
          if (response) {
            setStatus(response.status);

            switch (response.status) {
              case EMAIL_VERIFICATION.OK:
                toast.success(t("emailVerification.toastMessages.success"));

                setUser(user);
                break;
              case EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED:
                toast.info(
                  t("emailVerification.toastMessages.alreadyVerified"),
                );

                setUser(user);
                break;
              default:
                toast.error(t("emailVerification.toastMessages.invalidToken"));

                setVerifyEmailLoading(false);
                break;
            }
          }
        })
        .catch(() => {
          toast.error(`${t("emailVerification.toastMessages.error")}`);
          setStatus(EMAIL_VERIFICATION.ERROR);

          setVerifyEmailLoading(false);
        });
    }
  }, []);

  const handleResend = () => {
    resendVerificationEmail()
      .then((status) => {
        if (status === EMAIL_VERIFICATION.OK) {
          toast.success(t("emailVerification.toastMessages.resendSuccess"));
        } else if (status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED_ERROR) {
          toast.info(t("emailVerification.toastMessages.alreadyVerified"));

          setStatus(status);
          setVerifyEmailLoading(false);
        }
      })
      .catch(() => {
        toast.error(t("emailVerification.toastMessages.error"));

        setVerifyEmailLoading(false);
      });
  };

  const renderMessage = () => {
    if (verifyEmailLoading) {
      return <p>{t("emailVerification.messages.verifyingEmail")}</p>;
    }

    let message = "",
      button = <></>;

    switch (status) {
      case EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED:
        message = t("emailVerification.messages.alreadyVerified");
        break;
      case EMAIL_VERIFICATION.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR:
        message = t("emailVerification.messages.invalidToken");

        button = (
          <Button
            label={t("emailVerification.button.resendLink")}
            onClick={handleResend}
            className="resend-email"
          />
        );
        break;
      default:
        message = t("emailVerification.messages.error");
    }

    return (
      <>
        <p>{message}</p>
        {button}
      </>
    );
  };

  return (
    <AuthPage
      className="email-verification"
      title={t("emailVerification.verifyEmail")}
      loading={verifyEmailLoading}
      centered={centered}
    >
      {renderMessage()}
    </AuthPage>
  );
};

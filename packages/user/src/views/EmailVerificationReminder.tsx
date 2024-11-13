import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { EMAIL_VERIFICATION } from "../constants";
import { resendVerificationEmail } from "../supertokens/resend-email-verification";

export const EmailVerificationReminder = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const [isAlreadyVerified, setIsAlreadyVerified] = useState<boolean>(false);

  const { t } = useTranslation("user");

  const handleResend = () => {
    resendVerificationEmail()
      .then((status) => {
        if (status === EMAIL_VERIFICATION.OK) {
          toast.success(t("emailVerification.toastMessages.resendSuccess"));
        } else if (status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED_ERROR) {
          toast.info(t("emailVerification.toastMessages.alreadyVerified"));

          setIsAlreadyVerified(true);
        }
      })
      .catch(() => {
        toast.error(t("emailVerification.toastMessages.error"));
      });
  };

  return (
    <Page
      className="email-verification-reminder"
      title={t("emailVerification.title")}
      centered={centered}
    >
      {isAlreadyVerified ? (
        <p>{t("emailVerification.messages.alreadyVerified")}</p>
      ) : (
        <>
          <p>{t("emailVerification.messages.unverified")}</p>
          <p className="resend-email">
            {t("emailVerification.messages.resendEmailInfo")}{" "}
            <Link to="#" onClick={handleResend}>
              {t("emailVerification.button.resendEmail")}
            </Link>
          </p>
        </>
      )}
    </Page>
  );
};

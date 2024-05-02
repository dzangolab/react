import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Button } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { toast } from "react-toastify";

import { EMAIL_VERIFICATION } from "../constants";
import { resendVerificationEmail } from "../supertokens/resend-email-verification";

export const EmailVerificationReminder = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const { t } = useTranslation("user");

  const handleResend = () => {
    resendVerificationEmail()
      .then((status) => {
        if (status === EMAIL_VERIFICATION.OK) {
          toast.success(t("emailVerification.toastMessages.resendSuccess"));
        } else if (status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED_ERROR) {
          toast.info(t("emailVerification.toastMessages.alreadyVerified"));
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
      <Card className="email-verification-reminder-card">
        <div className="message-wrapper">
          {t("emailVerification.messages.unverified")}
        </div>
        <div className="button-wrapper">
          <Button
            label={t("emailVerification.button.resendEmail")}
            onClick={handleResend}
          />
        </div>
      </Card>
    </Page>
  );
};

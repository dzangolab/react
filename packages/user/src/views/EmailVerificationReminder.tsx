import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Button, Card, CardBody } from "@dzangolab/react-ui";
import { useState } from "react";
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
      <Card>
        <CardBody>
          {isAlreadyVerified ? (
            <p>{t("emailVerification.messages.alreadyVerified")}</p>
          ) : (
            <>
              <p>{t("emailVerification.messages.unverified")}</p>
              <Button
                label={t("emailVerification.button.resendEmail")}
                onClick={handleResend}
                className="resend-email"
              />
            </>
          )}
        </CardBody>
      </Card>
    </Page>
  );
};

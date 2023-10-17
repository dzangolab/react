import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";

import { resendEmail } from "@/supertokens/resend-email-verification";

const EmailVerificationReminder = () => {
  const { t } = useTranslation("user");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleResend = () => {
    resendEmail(t);
    setIsResendDisabled(true);
    setCountdown(10);
  };

  useEffect(() => {
    if (countdown > 0 && isResendDisabled) {
      setTimeout(() => {
        setCountdown((previous) => previous - 1);
      }, 1000);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  return (
    <Page className="email-verification" title={t("emailVerification.title")}>
      <Card>
        {t("emailVerification.messages.unverified")}
        <Button
          label={t("emailVerification.messages.resendEmail")}
          onClick={handleResend}
          disabled={isResendDisabled}
        />
        {isResendDisabled &&
          `You can resend the email in ${countdown} seconds `}
      </Card>
    </Page>
  );
};

export default EmailVerificationReminder;

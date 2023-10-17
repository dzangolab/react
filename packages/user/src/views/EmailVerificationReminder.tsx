import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { resendEmail } from "@/supertokens/resend-email-verification";

const EmailVerificationReminder = () => {
  const { t } = useTranslation("user");

  return (
    <Page
      className="email-verification-reminder"
      title={t("emailVerification.title")}
    >
      <Card className="email-verification-reminder-card">
        <div className="message-wrapper">
          {t("emailVerification.messages.unverified")}
        </div>
        <div className="button-wrapper">
          <Button
            label={t("emailVerification.button.resendEmail")}
            onClick={resendEmail}
          />
        </div>
      </Card>
    </Page>
  );
};

export default EmailVerificationReminder;

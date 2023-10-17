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
      <Card>
        <div className="reminder-message-wrapper">
          {t("emailVerification.messages.unverified")}
        </div>
        <div className="resend-email-button-wrapper">
          <Button
            label={t("emailVerification.button.resendEmail")}
            onClick={() => resendEmail(t)}
          />
        </div>
      </Card>
    </Page>
  );
};

export default EmailVerificationReminder;

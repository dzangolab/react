import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { resendEmail } from "@/supertokens/resend-email-verification";

const EmailVerificationReminder = () => {
  const { t } = useTranslation("user");

  return (
    <Page className="email-verification" title={t("emailVerification.title")}>
      <Card>
        {t("emailVerification.messages.unverified")}
        <div className="resend-button">
          <Button
            label={t("emailVerification.messages.resendEmail.button")}
            onClick={() => resendEmail(t)}
          />
        </div>
      </Card>
    </Page>
  );
};

export default EmailVerificationReminder;

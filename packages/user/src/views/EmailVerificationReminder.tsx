import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";

import { resendEmail } from "@/supertokens/resend-email-verification";

const EmailVerificationReminder = () => {
  const { t } = useTranslation("user");

  return (
    <Page className="email-verification" title={t("emailVerification.title")}>
      <Card>
        {t("emailVerification.messages.unverified")}
        <div
          className="resend-email-verification-message"
          onClick={() => resendEmail(t)}
        >
          {t("emailVerification.messages.resendEmail")}
        </div>
      </Card>
    </Page>
  );
};

export default EmailVerificationReminder;

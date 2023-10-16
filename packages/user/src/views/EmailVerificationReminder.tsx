import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";

import { resendEmail } from "@/supertokens/resend-email-verification";

const EmailVerificationReminder = ({
  redirectionDelayTime = 5,
}: {
  redirectionDelayTime?: number;
}) => {
  const { t } = useTranslation("user");

  return (
    <Page className="email-verification" title={t("emailVerification.title")}>
      <Card>
        {t("emailVerification.messages.unverified")}
        <div style={{ color: "blue", cursor: "pointer" }} onClick={resendEmail}>
          Click here to resend the email.
        </div>
      </Card>
    </Page>
  );
};

export default EmailVerificationReminder;

import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Card } from "primereact/card";

const EmailVerificationReminder = () => {
  const { t } = useTranslation("user");
  return (
    <Page className="verify-email" title={t("emailVerification.title")}>
      <Card>{t("emailVerification.messages.unverified")}</Card>
    </Page>
  );
};

export default EmailVerificationReminder;

import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";

const ProfileCompletionReminder = ({
  centered = true,
  onClick,
}: {
  centered?: boolean;
  onClick?: () => void;
}) => {
  const { t } = useTranslation("user");

  return (
    <Page
      className="profile-reminder"
      title={t("profileCompletion.title")}
      centered={centered}
    >
      <p>{t("profileCompletion.messages.reminder")}</p>
      <Button onClick={onClick}>
        {t("profileCompletion.buttons.gotoProfile")}
      </Button>
    </Page>
  );
};

export default ProfileCompletionReminder;

import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Card, CardBody, CardFooter, Page } from "@dzangolab/react-ui";

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
      className="profile-completion-reminder"
      title={t("profileCompletion.title")}
      centered={centered}
    >
      <Card>
        <CardBody>
          <p>{t("profileCompletion.messages.reminder")}</p>
        </CardBody>
        <CardFooter>
          <Button onClick={onClick}>
            {t("profileCompletion.buttons.gotoProfile")}
          </Button>
        </CardFooter>
      </Card>
    </Page>
  );
};

export default ProfileCompletionReminder;

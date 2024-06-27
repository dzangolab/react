import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";
import { useEffect, useState } from "react";

import { isOnGracePeriod } from "..";
import { useUser } from "../hooks";

const ProfileCompletionReminder = ({
  centered = true,
  onClick,
  onSkip,
}: {
  centered?: boolean;
  onClick?: () => void;
  onSkip?: () => void;
}) => {
  const [isGracePeriod, setIsGracePeriod] = useState<boolean | undefined>(
    false,
  );

  const { user, setUser } = useUser();
  const { t } = useTranslation("user");

  const handleSkip = async () => {
    await onSkip?.();

    if (user) {
      user.isOnGracePeriod = true;

      setUser(user);
    }
  };

  useEffect(() => {
    const getGracePeriod = async () => {
      setIsGracePeriod(await isOnGracePeriod());
    };

    getGracePeriod();
  }, []);

  return (
    <Page
      className="profile-completion-reminder"
      title={t("profileCompletion.title")}
      centered={centered}
    >
      <p>{t("profileCompletion.messages.reminder")}</p>
      <Button onClick={onClick}>
        {t("profileCompletion.buttons.gotoProfile")}
      </Button>
      {isGracePeriod && (
        <Button onClick={handleSkip}>
          {t("profileCompletion.buttons.skipProfile")}
        </Button>
      )}
    </Page>
  );
};

export default ProfileCompletionReminder;

import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";

import { ProfileForm } from "@/components/ProfileForm";

const Profile = () => {
  const { t } = useTranslation("user");

  return (
    <Page title={t("profile.title")} className="profile">
      <ProfileForm />
    </Page>
  );
};

export default Profile;

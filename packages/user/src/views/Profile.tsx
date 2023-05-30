import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";

import ProfileInformation from "../components/ProfileInformation";

const Profile = () => {
  const { t } = useTranslation("user");

  return (
    <Page title={t("profile.title")}>
      <ProfileInformation />
    </Page>
  );
};

export default Profile;

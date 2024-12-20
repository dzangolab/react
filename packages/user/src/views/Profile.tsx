import { AdditionalFormFields } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";

import { EmailUpdateModal, ProfileForm } from "@/components/Profile";

interface Properties {
  additionalProfileFields?: AdditionalFormFields;
  centered?: boolean;
}

export const Profile = ({ additionalProfileFields }: Properties) => {
  const { t } = useTranslation("user");

  return (
    <Page title={t("profile.title")} className="profile">
      <EmailUpdateModal />
      <ProfileForm additionalProfileFields={additionalProfileFields} />
    </Page>
  );
};

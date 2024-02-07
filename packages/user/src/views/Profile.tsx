import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";

import { ProfileForm } from "@/components/Profile";
import { AdditionalInvitationFields } from "@/types";

interface Properties {
  additionalInvitationFields?: AdditionalInvitationFields;
}

export const Profile = ({ additionalInvitationFields }: Properties) => {
  const { t } = useTranslation("user");

  return (
    <Page title={t("profile.title")} className="profile">
      <ProfileForm additionalInvitationFields={additionalInvitationFields} />
    </Page>
  );
};

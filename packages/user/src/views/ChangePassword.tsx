import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React, { useState } from "react";

import ChangePasswordForm from "@/components/ChangePasswordForm";

import "../assets/css/changePassword.css";

const ChangePassword = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    //[SM:01/01/2023] to do.
  };

  return (
    <div className="change-password">
      <Page title={t("changePassword.title")}>
        <ChangePasswordForm handleSubmit={handleSubmit} loading={loading} />
      </Page>
    </div>
  );
};

export default ChangePassword;

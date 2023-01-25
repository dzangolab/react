import { configContext } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import ChangePasswordForm from "@/components/ChangePasswordForm";
import changePassword from "@/supertokens/change-password";

import "../assets/css/changePassword.css";

const ChangePassword = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const appConfig = useContext(configContext);

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    setLoading(true);

    const success = await changePassword(
      oldPassword,
      newPassword,
      appConfig?.apiBaseUrl || ""
    );

    if (success) {
      toast.success(t("changePassword.messages.success"));
    }

    setLoading(false);
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

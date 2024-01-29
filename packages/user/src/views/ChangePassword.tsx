import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { toast } from "react-toastify";

import ChangePasswordForm from "../components/ChangePasswordForm";
import { useConfig } from "../hooks";
import changePassword from "../supertokens/change-password";

export const ChangePassword = () => {
  const { t } = useTranslation("user");
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    setLoading(true);

    const success = await changePassword(
      oldPassword,
      newPassword,
      appConfig?.apiBaseUrl || "",
    );

    if (success) {
      toast.success(t("changePassword.messages.success"));
    }

    setLoading(false);
  };

  return (
    <Page
      className="change-password"
      title={t("changePassword.title")}
      contentAlignment="center"
    >
      <ChangePasswordForm handleSubmit={handleSubmit} loading={loading} />
    </Page>
  );
};

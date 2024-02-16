import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import React from "react";

import { useChangePassword } from "@/hooks/useChangePassword";

import ChangePasswordForm from "../components/ChangePasswordForm";

export const ChangePassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");

  const [changePassword, { isLoading }] = useChangePassword();

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    await changePassword({ newPassword, oldPassword });
  };

  return (
    <AuthPage
      className="change-password"
      title={t("changePassword.title")}
      centered={centered}
    >
      <ChangePasswordForm handleSubmit={handleSubmit} loading={isLoading} />
    </AuthPage>
  );
};

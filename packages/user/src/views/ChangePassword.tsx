import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { toast } from "react-toastify";

import ChangePasswordForm from "../components/ChangePasswordForm";
import { useConfig } from "../hooks";
import changePassword from "../supertokens/change-password";

export const ChangePassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<(() => void) | null>(null);

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    setLoading(true);

    const success = await changePassword(
      oldPassword,
      newPassword,
      appConfig?.apiBaseUrl || "",
    );

    if (success) {
      toast.success(t("changePassword.messages.success"));
      if (reset) {
        reset();
      }
    }

    setLoading(false);
  };

  return (
    <AuthPage
      className="change-password"
      title={t("changePassword.title")}
      centered={centered}
    >
      <ChangePasswordForm
        handleSubmit={handleSubmit}
        loading={loading}
        setReset={setReset}
      />
    </AuthPage>
  );
};

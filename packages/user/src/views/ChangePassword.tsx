import { FormOptions } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { toast } from "react-toastify";

import ChangePasswordForm from "../components/ChangePasswordForm";
import { useConfig } from "../hooks";
import changePassword from "../supertokens/change-password";

export type ChangePasswordFormData = {
  oldPassword: string;
  password: string;
};

export const ChangePassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    data: ChangePasswordFormData,
    options?: FormOptions,
  ) => {
    setLoading(true);

    const success = await changePassword(
      data.oldPassword,
      data.password,
      appConfig?.apiBaseUrl || "",
    );

    if (success) {
      toast.success(t("changePassword.messages.success"));
      if (options && options.reset) {
        options.reset();
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
      <ChangePasswordForm handleSubmit={handleSubmit} loading={loading} />
    </AuthPage>
  );
};

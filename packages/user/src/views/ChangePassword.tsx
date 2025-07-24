import { FormSubmitOptions } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage } from "@prefabs.tech/react-ui";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { ChangePasswordForm } from "@/components";
import { changePassword } from "@/supertokens";

import { useConfig } from "../hooks";

export type ChangePasswordFormData = {
  oldPassword: string;
  password: string;
};

export const ChangePassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    data: ChangePasswordFormData,
    options?: FormSubmitOptions,
  ) => {
    setLoading(true);

    const success = await changePassword(
      data.oldPassword,
      data.password,
      config.apiBaseUrl,
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

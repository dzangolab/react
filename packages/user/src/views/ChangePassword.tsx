import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as zod from "zod";

import { PasswordConfirmationSchema } from "@/components/schemas";

import ChangePasswordForm from "../components/ChangePasswordForm";
import { useConfig } from "../hooks";
import changePassword from "../supertokens/change-password";

export const ChangePassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [formReset, setFormReset] = useState<(() => void) | null>(null);

  const ChangePasswordFormSchema = zod
    .object({
      oldPassword: zod
        .string()
        .nonempty(t("changePassword.messages.validation.oldPassword")),
      ...PasswordConfirmationSchema({
        passwordValidationMessage: t(
          "changePassword.messages.validation.mustContain",
        ),
        passwordRequiredMessage: t(
          "changePassword.messages.validation.newPassword",
        ),
        confirmPasswordRequiredMessage: t(
          "changePassword.messages.validation.confirmPassword",
        ),
      }),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("changePassword.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    );

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    setLoading(true);

    const success = await changePassword(
      oldPassword,
      newPassword,
      appConfig?.apiBaseUrl || "",
    );

    if (success) {
      toast.success(t("changePassword.messages.success"));
      if (formReset) {
        formReset();
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
      <Provider
        validationSchema={ChangePasswordFormSchema}
        onSubmit={(data) => handleSubmit(data.oldPassword, data.password)}
      >
        <ChangePasswordForm loading={loading} setFormReset={setFormReset} />
      </Provider>
    </AuthPage>
  );
};

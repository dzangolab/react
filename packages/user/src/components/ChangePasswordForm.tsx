import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import ChangePasswordFormFields from "./ChangePasswordFormFields";
import { PasswordConfirmationSchema } from "./schemas";

interface Properties {
  handleSubmit: (oldPassword: string, password: string) => void;
  loading?: boolean;
  setFormReset?: (argument: () => void) => void;
}

const ChangePasswordForm = ({
  handleSubmit,
  loading,
  setFormReset,
}: Properties) => {
  const { t } = useTranslation("user");

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

  return (
    <Provider
      validationSchema={ChangePasswordFormSchema}
      onSubmit={(data) => handleSubmit(data.oldPassword, data.password)}
    >
      <ChangePasswordFormFields loading={loading} setFormReset={setFormReset} />
    </Provider>
  );
};

export default ChangePasswordForm;

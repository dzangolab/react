import { Provider, FormSubmitOptions } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import { ChangePasswordFormData } from "@/views/ChangePassword";

import ChangePasswordFormFields from "./ChangePasswordFormFields";
import { PasswordConfirmationSchema } from "./schemas";

interface Properties {
  handleSubmit: (
    data: ChangePasswordFormData,
    options?: FormSubmitOptions,
  ) => void;
  loading?: boolean;
}

const ChangePasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t, i18n } = useTranslation("user");

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
      onSubmit={(data: ChangePasswordFormData, options?: FormSubmitOptions) =>
        handleSubmit(
          { oldPassword: data.oldPassword, password: data.password },
          options,
        )
      }
      validationTriggerKey={i18n.language}
    >
      <ChangePasswordFormFields loading={loading} />
    </Provider>
  );
};

export default ChangePasswordForm;

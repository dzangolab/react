import { Form, Password } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import React from "react";
import * as zod from "zod";

import { PasswordConfirmationSchema } from "./schemas";

interface Properties {
  handleSubmit: (newPassword: string) => void;
  loading?: boolean;
}

const ResetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ResetPasswordFormSchema = zod
    .object({
      ...PasswordConfirmationSchema({
        passwordRequiredMessage: t(
          "resetPassword.messages.validation.newPassword"
        ),
        passwordValidationMessage: t(
          "resetPassword.messages.validation.validationMessage"
        ),
        confirmPasswordRequiredMessage: t(
          "resetPassword.messages.validation.confirmPassword"
        ),
      }),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("resetPassword.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      }
    );

  return (
    <Form
      validationSchema={ResetPasswordFormSchema}
      onSubmit={(data) => handleSubmit(data.newPassword)}
    >
      <Password
        label={t("resetPassword.form.newPassword.label")}
        name="password"
      />
      <Password
        label={t("resetPassword.form.confirmPassword.label")}
        name="confirmPassword"
      />
      <SubmitButton
        label={t("resetPassword.form.actions.submit")}
        loading={loading}
      />
    </Form>
  );
};

export default ResetPasswordForm;

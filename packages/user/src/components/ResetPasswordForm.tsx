import { Form, Password, passwordSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import React from "react";
import * as zod from "zod";

interface Properties {
  handleSubmit: (newPassword: string) => void;
  loading?: boolean;
}

const ResetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ResetPasswordFormSchema = zod
    .object({
      newPassword: passwordSchema(
        {
          weak: t("resetPassword.messages.validation.validationMessage"),
          required: t("resetPassword.messages.validation.newPassword"),
        },
        {
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
        }
      ),
      confirmPassword: zod
        .string()
        .nonempty(t("resetPassword.messages.validation.confirmPassword")),
    })
    .refine(
      (data) => {
        return data.newPassword === data.confirmPassword;
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
        name="newPassword"
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

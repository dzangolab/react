import { Form, FormActions, Password } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { AuthFormWrapper } from "@dzangolab/react-ui";
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
          "resetPassword.messages.validation.newPassword",
        ),
        passwordValidationMessage: t(
          "resetPassword.messages.validation.validationMessage",
        ),
        confirmPasswordRequiredMessage: t(
          "resetPassword.messages.validation.confirmPassword",
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
      },
    );

  const renderForm = () => {
    return (
      <Form
        validationSchema={ResetPasswordFormSchema}
        onSubmit={(data) => handleSubmit(data.password)}
      >
        <Password
          label={t("resetPassword.form.newPassword.label")}
          name="password"
        />
        <Password
          label={t("resetPassword.form.confirmPassword.label")}
          name="confirmPassword"
        />
        <FormActions
          actions={[
            {
              id: "submit",
              label: t("resetPassword.form.actions.submit"),
            },
          ]}
          loading={loading}
          alignment="fill"
        />
      </Form>
    );
  };

  return <AuthFormWrapper form={renderForm()} className="reset-password" />;
};

export default ResetPasswordForm;

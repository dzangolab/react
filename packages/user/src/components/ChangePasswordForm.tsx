import { Form, FormActions, Password } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { AuthFormWrapper } from "@dzangolab/react-ui";
import React from "react";
import * as zod from "zod";

import { PasswordConfirmationSchema } from "./schemas";

interface Properties {
  handleSubmit: (oldPassword: string, password: string) => void;
  loading?: boolean;
}

const ChangePasswordForm = ({ handleSubmit, loading }: Properties) => {
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

  const renderForm = () => {
    return (
      <Form
        validationSchema={ChangePasswordFormSchema}
        onSubmit={(data) => handleSubmit(data.oldPassword, data.password)}
      >
        <Password
          label={t("changePassword.form.oldPassword.label")}
          name="oldPassword"
        />
        <Password
          label={t("changePassword.form.newPassword.label")}
          name="password"
        />
        <Password
          label={t("changePassword.form.confirmPassword.label")}
          name="confirmPassword"
        />

        <FormActions
          actions={[
            {
              id: "submit",
              label: t("changePassword.form.actions.submit"),
            },
          ]}
          loading={loading}
          alignment="fill"
        />
      </Form>
    );
  };

  return <AuthFormWrapper className="change-password" form={renderForm()} />;
};

export default ChangePasswordForm;

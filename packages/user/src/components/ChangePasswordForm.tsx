import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import ChangePasswordFormFields from "./ChangePasswordFormFields";
import { PasswordConfirmationSchema } from "./schemas";

interface Properties {
  handleSubmit: (
    data: { oldPassword: string; newPassword: string },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
  ) => void;
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

  return (
    <Provider
      validationSchema={ChangePasswordFormSchema}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={(data: any, options: any) =>
        handleSubmit(
          { oldPassword: data.oldPassword, newPassword: data.password },
          options,
        )
      }
      resetOnSubmit={true}
    >
      <ChangePasswordFormFields loading={loading} />
    </Provider>
  );
};

export default ChangePasswordForm;

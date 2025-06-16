import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import { PasswordConfirmationSchema } from "../schemas";
import SignupFormFields from "./SignupFormFields";
import { useConfig } from "../../hooks";

import type { LoginCredentials } from "../../types";

interface Properties {
  email?: string;
  loading?: boolean;
  termsAndConditions?: React.ReactNode;
  handleSubmit: (credentials: LoginCredentials) => void;
}

export const SignupForm = ({
  email,
  loading,
  termsAndConditions,
  handleSubmit,
}: Properties) => {
  const { t, i18n } = useTranslation("user");
  const config = useConfig();

  const SignUpFormSchema = zod
    .object({
      email: emailSchema({
        invalid: t("validation.messages.validEmail"),
        required: t("validation.messages.email"),
      }),
      ...PasswordConfirmationSchema({
        passwordRequiredMessage: t("signup.messages.validation.password"),
        passwordValidationMessage: t(
          "signup.messages.validation.validationMessage",
        ),
        confirmPasswordRequiredMessage: t(
          "signup.messages.validation.confirmPassword",
        ),
      }),
      ...(config.features?.termsAndConditions?.display &&
      config.features.termsAndConditions.showCheckbox
        ? {
            termsAndConditions: zod
              .boolean()
              .refine((value) => value === true, {
                message: t("signup.messages.validation.termsAndConditions"),
              }),
          }
        : {}),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("signup.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    );

  return (
    <Provider
      onSubmit={handleSubmit}
      defaultValues={{
        password: "",
        email: email || "",
        confirmPassword: "",
        termsAndConditions: false,
      }}
      validationSchema={SignUpFormSchema}
      validationTriggerKey={i18n.language}
    >
      <SignupFormFields
        disableEmailField={!!email}
        loading={loading}
        termsAndConditions={termsAndConditions}
      />
    </Provider>
  );
};

import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import { PasswordConfirmationSchema } from "./schemas";
import SignupFormFields from "./SignupFormFields";

import type { LoginCredentials } from "../types";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
}

const SignupForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const SignUpFormSchema = zod
    .object({
      email: emailSchema({
        invalid: t("validation.messages.validEmail"),
        required: t("validation.messages.email"),
      }),
      ...PasswordConfirmationSchema({
        passwordRequiredMessage: t("signup.messages.validation.password"),
        passwordValidationMessage: t(
          "signup.messages.validation.validationMessage"
        ),
        confirmPasswordRequiredMessage: t(
          "signup.messages.validation.confirmPassword"
        ),
      }),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("signup.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      }
    );

  return (
    <Provider
      onSubmit={handleSubmit}
      defaultValues={{
        password: "",
        email: "",
        confirmPassword: "",
        termsAndCondition: false,
      }}
      validationSchema={SignUpFormSchema}
    >
      <SignupFormFields loading={loading} />
    </Provider>
  );
};

export default SignupForm;

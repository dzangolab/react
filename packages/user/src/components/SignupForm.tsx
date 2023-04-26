import {
  Email,
  Form,
  Password,
  emailSchema,
  passwordSchema,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import React from "react";
import * as zod from "zod";

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
      password: passwordSchema(
        {
          required: t("signup.messages.validation.password"),
          weak: t("signup.messages.validation.validationMessage"),
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
        .nonempty(t("signup.messages.validation.confirmPassword")),
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
    <Form validationSchema={SignUpFormSchema} onSubmit={handleSubmit}>
      <Email
        label={t("signup.form.email.label")}
        name="email"
        placeholder={t("signup.form.email.placeholder")}
      />
      <Password label={t("signup.form.password.label")} name="password" />
      <Password
        label={t("signup.form.confirmPassword.label")}
        name="confirmPassword"
      />
      <SubmitButton
        label={`${t("signup.form.actions.submit")}`}
        loading={loading}
      />
    </Form>
  );
};

export default SignupForm;

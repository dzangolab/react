import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingButton } from "@dzangolab/react-ui";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import ErrorMessage from "./ErrorMessage";
import PasswordConfirmation from "./PasswordConfirmation";
import { PasswordConfirmationSchema } from "./schemas";

import type { LoginCredentials } from "../types";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
}

const SignupForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const SignUpFormSchema = Yup.object({
    email: Yup.string()
      .email("validation.messages.validEmail")
      .required("validation.messages.email"),
    ...PasswordConfirmationSchema({
      passwordValidationMessage: "signup.messages.validation.validationMessage",
      passwordRequiredMessage: "signup.messages.validation.password",
      confirmPasswordValidationMessage: "signup.messages.validation.mustMatch",
      confirmPasswordRequiredMessage:
        "signup.messages.validation.confirmPassword",
    }),
  });

  const initialValue = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={SignUpFormSchema}
      onSubmit={(values, action) => {
        const data = { email: values.email, password: values.password };
        handleSubmit(data);
        action.resetForm();
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field email">
            <label htmlFor="email">{t("signup.form.email.label")}</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder={t("signup.form.email.placeholder")}
            />
            <ErrorMessage
              touched={touched.email}
              error={errors.email ? t(errors.email) : undefined}
            />
          </div>

          <PasswordConfirmation
            errors={errors}
            touched={touched}
            passwordLabel={t("signup.form.password.label")}
            confirmPasswordLabel={t("signup.form.confirmPassword.label")}
          />

          <div className="actions">
            <LoadingButton
              label={t("signup.form.actions.submit")}
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;

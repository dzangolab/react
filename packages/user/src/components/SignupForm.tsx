import { useTranslation } from "@dzangolab/react-i18n";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import ErrorMessage from "./ErrorMessage";

import type { LoginCredentials } from "@/types";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
}

const SignupForm = ({ handleSubmit }: Properties) => {
  const { t } = useTranslation("user");

  const SingUpFormSchema = Yup.object({
    email: Yup.string()
      .email("validation.messages.validEmail")
      .required("validation.messages.email"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
        "signup.messages.validation.validationMessage"
      )
      .required(t("signup.messages.validation.password")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "signup.messages.validation.mustMatch"
      )
      .required(t("signup.messages.validation.confirmPassword")),
  });

  const initialValue = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={SingUpFormSchema}
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

          <div className="field password">
            <label htmlFor="password">{t("signup.form.password.label")}</label>
            <Field id="password" type="password" name="password" />
            <ErrorMessage
              touched={touched.password}
              error={errors.password ? t(errors.password) : undefined}
            />
          </div>

          <div className="field password">
            <label htmlFor="confirmPassword">
              {t("signup.form.confirmPassword.label")}
            </label>
            <Field
              id="confirmPassword"
              type="password"
              name="confirmPassword"
            />
            <ErrorMessage
              touched={touched.confirmPassword}
              error={
                errors.confirmPassword ? t(errors.confirmPassword) : undefined
              }
            />
          </div>

          <div className="actions">
            <button type="submit">{t("signup.form.actions.submit")}</button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;

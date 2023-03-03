import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingButton } from "@dzangolab/react-ui";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import ErrorMessage from "./ErrorMessage";

import type { LoginCredentials } from "@/types/types";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
}

const PasswordConfirmationForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const PasswordConfirmationFormSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
        "passwordConfirmation.messages.validation.validationMessage"
      )
      .required("password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "passwordConfirmation.messages.validation.password"
      )
      .required("passwordConfirmation.messages.validation.confirmPassword"),
  });

  const initialValue = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={PasswordConfirmationFormSchema}
      onSubmit={(values, action) => {
        const data = { email: values.email, password: values.password };
        handleSubmit(data);
        action.resetForm();
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field password">
            <label htmlFor="password">
              {t("passwordConfirmation.form.password.label")}
            </label>
            <Field id="password" type="password" name="password" />
            <ErrorMessage
              touched={touched.password}
              error={errors.password ? t(errors.password) : undefined}
            />
          </div>

          <div className="field password">
            <label htmlFor="confirmPassword">
              {" "}
              {t("passwordConfirmation.form.confirmPassword.label")}
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
            <LoadingButton
              label={t("passwordConfirmation.form.actions.submit")}
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PasswordConfirmationForm;

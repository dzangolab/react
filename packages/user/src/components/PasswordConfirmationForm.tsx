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
    email: Yup.string().email("Email validation").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
        "Password must include a number ,uppercase letter,lowercase letter"
      )
      .required("password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "password must match")
      .required("confirm password is required"),
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
            <label htmlFor="password">Password</label>
            <Field id="password" type="password" name="password" />
            <ErrorMessage
              touched={touched.password}
              error={errors.password ? errors.password : undefined}
            />
          </div>

          <div className="field password">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              id="confirmPassword"
              type="password"
              name="confirmPassword"
            />
            <ErrorMessage
              touched={touched.confirmPassword}
              error={
                errors.confirmPassword ? errors.confirmPassword : undefined
              }
            />
          </div>

          <div className="actions">
            <LoadingButton label="submit" loading={loading} />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PasswordConfirmationForm;

import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingButton } from "@dzangolab/react-ui";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import ErrorMessage from "./ErrorMessage";

interface Properties {
  handleSubmit: (email: string) => void;
  loading?: boolean;
}

const ForgetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ForgetPasswordFormSchema = Yup.object({
    email: Yup.string()
      .email("validation.messages.validEmail")
      .required("validation.messages.email"),
  });

  const initialValue = {
    email: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={ForgetPasswordFormSchema}
      onSubmit={(values, action) => {
        const email = values.email;
        handleSubmit(email);
        action.resetForm();
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field email">
            <label htmlFor="email">
              {t("forgetPassword.form.email.label")}
            </label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder={t("forgetPassword.form.email.placeholder")}
            />
            <ErrorMessage
              touched={touched.email}
              error={errors.email ? t(errors.email) : undefined}
            />
          </div>

          <div className="actions">
            <LoadingButton
              label={t("forgetPassword.form.actions.submit")}
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;

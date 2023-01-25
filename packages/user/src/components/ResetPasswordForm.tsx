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

const ResetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ResetPasswordFormSchema = Yup.object({
    newPassword: Yup.string().required(
      "resetPassword.messages.validation.newPassword"
    ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "resetPassword.messages.validation.mustMatch"
      )
      .required("resetPassword.messages.validation.confirmPassword"),
  });

  const initialValue = {
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={ResetPasswordFormSchema}
      onSubmit={(values, action) => {
        const newPassword = values.newPassword;
        handleSubmit(newPassword);
        action.resetForm();
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field newPassword">
            <label htmlFor="newPassword">
              {t("resetPassword.form.newPassword.label")}
            </label>
            <Field id="newPassword" type="password" name="newPassword" />
            <ErrorMessage
              touched={touched.newPassword}
              error={errors.newPassword ? t(errors.newPassword) : undefined}
            />
          </div>
          <div className="field confirmPassword">
            <label htmlFor="confirmPassword">
              {t("resetPassword.form.confirmPassword.label")}
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
              label={t("resetPassword.form.actions.submit")}
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;

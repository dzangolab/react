import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingButton } from "@dzangolab/react-ui";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import ErrorMessage from "./ErrorMessage";

interface Properties {
  handleSubmit: (oldPassword: string, newPassword: string) => void;
  loading?: boolean;
}

const ChangePasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ChangePasswordFormSchema = Yup.object({
    oldPassword: Yup.string().required(
      "changePassword.messages.validation.oldPassword"
    ),
    newPassword: Yup.string().required(
      "changePassword.messages.validation.newPassword"
    ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "changePassword.messages.validation.mustMatch"
      )
      .required("changePassword.messages.validation.confirmPassword"),
  });

  const initialValue = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={ChangePasswordFormSchema}
      onSubmit={(values, action) => {
        const oldPassword = values.oldPassword;
        const newPassword = values.newPassword;
        handleSubmit(oldPassword, newPassword);
        action.resetForm();
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field oldPassword">
            <label htmlFor="oldPassword">
              {t("changePassword.form.oldPassword.label")}
            </label>
            <Field id="oldPassword" type="password" name="oldPassword" />
            <ErrorMessage
              touched={touched.oldPassword}
              error={errors.oldPassword ? t(errors.oldPassword) : undefined}
            />
          </div>
          <div className="field newPassword">
            <label htmlFor="newPassword">
              {t("changePassword.form.newPassword.label")}
            </label>
            <Field id="newPassword" type="password" name="newPassword" />
            <ErrorMessage
              touched={touched.newPassword}
              error={errors.newPassword ? t(errors.newPassword) : undefined}
            />
          </div>
          <div className="field confirmPassword">
            <label htmlFor="confirmPassword">
              {t("changePassword.form.confirmPassword.label")}
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
              label={t("changePassword.form.actions.submit")}
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;

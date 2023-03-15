import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingButton } from "@dzangolab/react-ui";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import ErrorMessage from "./ErrorMessage";
import PasswordConfirmation from "./PasswordConfirmation";
import { PasswordConfirmationSchema } from "./schemas";

interface Properties {
  handleSubmit: (oldPassword: string, password: string) => void;
  loading?: boolean;
}

const ChangePasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ChangePasswordFormSchema = Yup.object({
    oldPassword: Yup.string().required(
      "changePassword.messages.validation.oldPassword"
    ),
    ...PasswordConfirmationSchema({
      passwordValidationMessage:
        "changePassword.messages.validation.mustContain",
      passwordRequiredMessage: "changePassword.messages.validation.newPassword",
      confirmPasswordValidationMessage:
        "changePassword.messages.validation.mustMatch",
      confirmPasswordRequiredMessage:
        "changePassword.messages.validation.confirmPassword",
    }),
  });

  const initialValue = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={ChangePasswordFormSchema}
      onSubmit={(values, action) => {
        const oldPassword = values.oldPassword;
        const newPassword = values.password;
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
          <PasswordConfirmation
            errors={errors}
            touched={touched}
            passwordLabel={t("changePassword.form.newPassword.label")}
            confirmPasswordLabel={t(
              "changePassword.form.confirmPassword.label"
            )}
          />

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

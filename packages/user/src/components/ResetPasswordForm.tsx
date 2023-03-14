import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingButton } from "@dzangolab/react-ui";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import PasswordConfirmation from "./PasswordConfirmation";
import { PasswordConfirmationSchema } from "./schemas";

interface Properties {
  handleSubmit: (email: string) => void;
  loading?: boolean;
}

const ResetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ResetPasswordFormSchema = Yup.object({
    ...PasswordConfirmationSchema(
      "resetPassword.messages.validation.validationMessage",
      "resetPassword.messages.validation.newPassword",
      "resetPassword.messages.validation.mustMatch",
      "resetPassword.messages.validation.confirmPassword"
    ),
  });

  const initialValue = {
    password: "",
    confirmPassword: "",
  };

  const label = {
    passwordLabel: t("resetPassword.form.newPassword.label"),
    confirmPasswordLabel: t("resetPassword.form.confirmPassword.label"),
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={ResetPasswordFormSchema}
      onSubmit={(values, action) => {
        const newPassword = values.password;
        handleSubmit(newPassword);
        action.resetForm();
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form className="form" onSubmit={handleSubmit}>
          <PasswordConfirmation
            errors={errors}
            touched={touched}
            label={label}
          />
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

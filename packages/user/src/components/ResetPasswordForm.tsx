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
    ...PasswordConfirmationSchema({
      passwordValidationMessage:
        "resetPassword.messages.validation.validationMessage",
      passwordRequiredMessage: "resetPassword.messages.validation.newPassword",
      confirmPasswordValidationMessage:
        "resetPassword.messages.validation.mustMatch",
      confirmPasswordRequiredMessage:
        "resetPassword.messages.validation.confirmPassword",
    }),
  });

  const initialValue = {
    password: "",
    confirmPassword: "",
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
            passwordLabel={t("resetPassword.form.newPassword.label")}
            confirmPasswordLabel={t("resetPassword.form.confirmPassword.label")}
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

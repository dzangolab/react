import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import { Field } from "formik";
import ErrorMessage from "./ErrorMessage";

const PasswordConfirmation = ({
  touched,
  errors,
  passwordLabel,
  confirmPasswordLabel,
}: any) => {
  const { t } = useTranslation("user");

  return (
    <>
      <div className="field password">
        <label htmlFor="password">{passwordLabel}</label>
        <Field id="password" type="password" name="password" />
        <ErrorMessage
          touched={touched.password}
          error={errors.password ? t(errors.password) : undefined}
        />
      </div>

      <div className="field password">
        <label htmlFor="confirmPassword">{confirmPasswordLabel}</label>
        <Field id="confirmPassword" type="password" name="confirmPassword" />
        <ErrorMessage
          touched={touched.confirmPassword}
          error={errors.confirmPassword ? t(errors.confirmPassword) : undefined}
        />
      </div>
    </>
  );
};

export default PasswordConfirmation;

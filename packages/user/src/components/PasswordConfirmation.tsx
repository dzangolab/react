import { useTranslation } from "@dzangolab/react-i18n";
import { Field, FormikErrors, FormikTouched } from "formik";
import React from "react";

import ErrorMessage from "./ErrorMessage";

interface IProperties {
  touched: FormikTouched<{
    password: string;
    confirmPassword: string;
  }>;
  errors: FormikErrors<{
    password: string;
    confirmPassword: string;
  }>;
  passwordLabel: string;
  confirmPasswordLabel: string;
}

const PasswordConfirmation: React.FC<IProperties> = ({
  touched,
  errors,
  passwordLabel,
  confirmPasswordLabel,
}) => {
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

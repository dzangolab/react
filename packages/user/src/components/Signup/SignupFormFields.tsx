import {
  Email,
  FormActions,
  Password,
  useFormContext,
  useWatch,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React, { useEffect } from "react";

import { TermsAndConditions } from "./TermsAndConditions";
import { useConfig } from "../../hooks";

interface IProperties {
  loading?: boolean;
  disableEmailField?: boolean;
}

const SignupFormFields: React.FC<IProperties> = ({
  loading,
  disableEmailField = false,
}) => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const {
    register,
    getFieldState,
    formState: { errors, submitCount, isSubmitted },
    control,
    trigger,
    watch,
  } = useFormContext();

  const {
    display: showTermsAndConditions,
    showCheckbox,
    label,
  } = config.features?.termsAndConditions || {};

  let isChecked = false;

  const passwordFieldValue = watch("password");

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    trigger("confirmPassword");
  }, [passwordFieldValue]);

  if (showTermsAndConditions && showCheckbox) {
    isChecked = useWatch({ control: control, name: "termsAndConditions" });
  }

  return (
    <>
      <Email
        label={t("signup.form.email.label")}
        name="email"
        placeholder={t("signup.form.email.placeholder")}
        submitCount={submitCount}
        disabled={disableEmailField}
      />
      <Password
        label={t("signup.form.password.label")}
        name="password"
        register={register}
        getFieldState={getFieldState}
        submitCount={submitCount}
        helperText={t("signup.form.password.helperText")}
      />
      <Password
        label={t("signup.form.confirmPassword.label")}
        name="confirmPassword"
        register={register}
        getFieldState={getFieldState}
        submitCount={submitCount}
      />
      {showTermsAndConditions ? (
        <TermsAndConditions
          hasCheckbox={showCheckbox}
          label={label}
          name="termsAndConditions"
        />
      ) : null}

      <FormActions
        actions={[
          {
            id: "submit",
            disabled:
              !!Object.values(errors).length ||
              (showTermsAndConditions && showCheckbox && !isChecked),
            label: t("signup.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};

export default SignupFormFields;

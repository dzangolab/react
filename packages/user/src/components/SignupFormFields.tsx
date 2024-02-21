import {
  Email,
  FormActions,
  Password,
  useFormContext,
  useWatch,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React, { useEffect } from "react";

import TermsAndConditions from "./TermsAndConditions";
import { useConfig } from "../hooks";

interface IProperties {
  loading?: boolean;
  disableEmailField?: boolean;
}

const SignupFormFields: React.FC<IProperties> = ({
  loading,
  disableEmailField = false,
}) => {
  const { t } = useTranslation("user");
  const { user } = useConfig();
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
    control,
    trigger,
  } = useFormContext();

  const showTermsAndConditions = user.termsAndConditions?.display;
  let isChecked = false;

  if (showTermsAndConditions && user.termsAndConditions?.showCheckbox) {
    isChecked = useWatch({ control: control, name: "termsAndConditions" });
  }

  const password = useWatch({
    name: "password",
    control: control,
  });

  useEffect(() => {
    const { isTouched } = getFieldState("password");
    if (isTouched) {
      trigger("confirmPassword");
    }
  }, [password]);

  return (
    <>
      <Email
        label={t("signup.form.email.label")}
        name="email"
        placeholder={t("signup.form.email.placeholder")}
        register={register}
        getFieldState={getFieldState}
        submitcount={submitCount}
        disabled={disableEmailField}
      />
      <Password
        label={t("signup.form.password.label")}
        name="password"
        register={register}
        getFieldState={getFieldState}
        submitcount={submitCount}
      />
      <Password
        label={t("signup.form.confirmPassword.label")}
        name="confirmPassword"
        register={register}
        getFieldState={getFieldState}
        submitcount={submitCount}
      />
      {showTermsAndConditions ? (
        <TermsAndConditions
          hasCheckbox={user.termsAndConditions?.showCheckbox}
          label={user.termsAndConditions?.label()}
          name="termsAndConditions"
          register={register}
        />
      ) : null}

      <FormActions
        actions={[
          {
            id: "submit",
            disabled:
              !!Object.values(errors).length ||
              (showTermsAndConditions &&
                user.termsAndConditions?.showCheckbox &&
                !isChecked),
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

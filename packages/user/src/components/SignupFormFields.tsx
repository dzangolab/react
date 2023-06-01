import {
  Email,
  Password,
  useFormContext,
  useWatch,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import React from "react";

import TermsAndCondition from "./TermsAndCondition";

interface IProperties {
  hasTerms?: boolean;
  loading?: boolean;
}

const SignupFormFields: React.FC<IProperties> = ({
  hasTerms = false,
  loading,
}) => {
  const { t } = useTranslation("user");
  const {
    register,
    getFieldState,
    formState: { errors },
    control,
  } = useFormContext();

  let isChecked = false;

  if (hasTerms) {
    isChecked = useWatch({ control: control, name: "terms" });
  }

  return (
    <>
      <Email
        label={t("signup.form.email.label")}
        name="email"
        placeholder={t("signup.form.email.placeholder")}
        register={register}
        getFieldState={getFieldState}
      />
      <Password
        label={t("signup.form.password.label")}
        name="password"
        register={register}
        getFieldState={getFieldState}
      />
      <Password
        label={t("signup.form.confirmPassword.label")}
        name="confirmPassword"
        register={register}
        getFieldState={getFieldState}
      />
      {hasTerms ? (
        <TermsAndCondition
          label="I agree to terms"
          name="termsAndCondition"
          register={register}
        />
      ) : null}
      <SubmitButton
        label={`${t("signup.form.actions.submit")}`}
        loading={loading}
        disabled={!!Object.values(errors).length || (hasTerms && !isChecked)}
      />
    </>
  );
};

export default SignupFormFields;

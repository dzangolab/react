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
import { useConfig } from "../hooks";

interface IProperties {
  loading?: boolean;
}

const SignupFormFields: React.FC<IProperties> = ({ loading }) => {
  const { t } = useTranslation("user");
  const { user } = useConfig();
  const {
    register,
    getFieldState,
    formState: { errors },
    control,
  } = useFormContext();

  const hasTermsAndCondition = user.routes?.signup?.termsAndCondition;
  let isChecked = false;

  if (hasTermsAndCondition && user.routes?.signup?.checkbox) {
    isChecked = useWatch({ control: control, name: "termsAndCondition" });
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
      <div className="field buttons">
        {hasTermsAndCondition ? (
          <TermsAndCondition
            hasCheckbox={user.routes?.signup?.checkbox}
            label={user.routes?.signup?.label ? user.routes.signup.label() : ""}
            name="termsAndCondition"
            register={register}
          />
        ) : null}

        <SubmitButton
          label={`${t("signup.form.actions.submit")}`}
          loading={loading}
          disabled={
            !!Object.values(errors).length ||
            (hasTermsAndCondition &&
              user.routes?.signup?.checkbox &&
              !isChecked)
          }
        />
      </div>
    </>
  );
};

export default SignupFormFields;

import { FormActions, Password, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React, { useEffect } from "react";

interface Properties {
  loading?: boolean;
  setFormReset?: (argument: () => void) => void;
}

const ChangePasswordForm = ({ loading, setFormReset }: Properties) => {
  const { t } = useTranslation("user");

  const {
    register,
    getFieldState,
    reset,
    formState: { errors, submitCount, isDirty },
  } = useFormContext();

  useEffect(() => {
    if (setFormReset) {
      setFormReset(() => reset);
    }
  }, [setFormReset, reset]);

  return (
    <>
      <Password
        autoComplete="current-password"
        label={t("changePassword.form.oldPassword.label")}
        name="oldPassword"
        register={register}
        getFieldState={getFieldState}
      />
      <Password
        label={t("changePassword.form.newPassword.label")}
        name="password"
        register={register}
        getFieldState={getFieldState}
      />
      <Password
        label={t("changePassword.form.confirmPassword.label")}
        name="confirmPassword"
        register={register}
        getFieldState={getFieldState}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("changePassword.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};

export default ChangePasswordForm;

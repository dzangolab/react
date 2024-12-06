import { FormActions, Email, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";

interface Properties {
  loading?: boolean;
}

const ForgotPasswordFormFields = ({ loading }: Properties) => {
  const { t } = useTranslation("user");

  const {
    formState: { errors, submitCount, isDirty },
  } = useFormContext();

  return (
    <>
      <Email
        label={t("forgotPassword.form.email.label")}
        name="email"
        placeholder={t("forgotPassword.form.email.placeholder")}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("forgotPassword.form.actions.submit"),
            disabled: !isDirty,
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};

export default ForgotPasswordFormFields;

import {
  Email,
  Provider,
  FormActions,
  emailSchema,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { AuthFormWrapper } from "@dzangolab/react-ui";
import React from "react";
import * as zod from "zod";

interface Properties {
  handleSubmit: (email: string) => void;
  links?: React.ReactNode;
  loading?: boolean;
}

export const ForgotPasswordForm = ({
  handleSubmit,
  links,
  loading,
}: Properties) => {
  const { t } = useTranslation("user");

  const ForgotPasswordFormSchema = zod.object({
    email: emailSchema({
      required: t("validation.messages.email"),
      invalid: t("validation.messages.validEmail"),
    }),
  });

  const renderForm = () => {
    return (
      <Provider
        validationSchema={ForgotPasswordFormSchema}
        onSubmit={(data) => handleSubmit(data.email)}
      >
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
            },
          ]}
          loading={loading}
          alignment="fill"
        />
      </Provider>
    );
  };

  return (
    <AuthFormWrapper
      className="forgot-password"
      form={renderForm()}
      links={links}
    />
  );
};

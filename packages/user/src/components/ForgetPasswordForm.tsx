import { Email, Form, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import React from "react";
import * as zod from "zod";

interface Properties {
  handleSubmit: (email: string) => void;
  loading?: boolean;
}

const ForgetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ForgetPasswordFormSchema = zod.object({
    email: emailSchema({
      required: t("validation.messages.email"),
      invalid: t("validation.messages.validEmail"),
    }),
  });

  return (
    <Form
      validationSchema={ForgetPasswordFormSchema}
      onSubmit={(data) => handleSubmit(data.email)}
    >
      <Email
        label={t("forgetPassword.form.email.label")}
        name="email"
        placeholder={t("forgetPassword.form.email.placeholder")}
      />
      <SubmitButton
        label={t("forgetPassword.form.actions.submit")}
        loading={loading}
      />
    </Form>
  );
};

export default ForgetPasswordForm;

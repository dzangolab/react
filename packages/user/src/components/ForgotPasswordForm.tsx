import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import ForgotPasswordFormFields from "./ForgotPasswordFormFields";
interface Properties {
  handleSubmit: (email: string) => void;
  loading?: boolean;
}

export const ForgotPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const ForgotPasswordFormSchema = zod.object({
    email: emailSchema({
      required: t("validation.messages.email"),
      invalid: t("validation.messages.validEmail"),
    }),
  });

  return (
    <Provider
      validationSchema={ForgotPasswordFormSchema}
      onSubmit={(data) => handleSubmit(data.email)}
    >
      <ForgotPasswordFormFields loading={loading} />
    </Provider>
  );
};

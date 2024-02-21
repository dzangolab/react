import {
  Email,
  Form,
  FormActions,
  Password,
  emailSchema,
  passwordSchema,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import * as zod from "zod";

import { LoginCredentials } from "../../types";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
}

export const LoginForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const LoginFormSchema = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
    password: passwordSchema(
      {
        required: t("login.messages.validation.password"),
        weak: "",
      },
      {
        minLength: 0,
      },
    ),
  });

  return (
    <Form validationSchema={LoginFormSchema} onSubmit={handleSubmit}>
      <Email
        label={t("login.form.email.label")}
        name="email"
        placeholder={t("login.form.email.placeholder")}
        showValidationState={false}
      />
      <Password
        label={t("login.form.password.label")}
        name="password"
        showValidationState={false}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("login.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </Form>
  );
};

import {
  Email,
  Form,
  Password,
  emailSchema,
  passwordSchema,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import * as zod from "zod";

import { LoginCredentials } from "../types";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
}

const LoginForm = ({ handleSubmit, loading }: Properties) => {
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
      />
      <Password
        label={t("login.form.password.label")}
        name="password"
        isSignup={false}
      />
      <SubmitButton label={t("login.form.actions.submit")} loading={loading} />
    </Form>
  );
};

export default LoginForm;

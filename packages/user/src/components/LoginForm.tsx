import {
  Email,
  Form,
  Password,
  emailSchema,
  passwordSchema,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import { useState } from "react";
import { toast } from "react-toastify";
import * as zod from "zod";

import { login, useUser, verifySessionRoles } from "..";
import { LoginCredentials, SignInUpPromise } from "../types";

// eslint-disable-next-line import/no-unresolved
import { useConfig } from "@/hooks";

interface Properties {
  handleSubmit?: (credentials: LoginCredentials) => void;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
}

const LoginForm = ({
  handleSubmit,
  onLoginFailed,
  onLoginSuccess,
}: Properties) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit;
    } else {
      setLoading(true);

      await login(credentials)
        .then(async (result) => {
          if (result?.user) {
            if (
              appConfig &&
              (await verifySessionRoles(appConfig.user.supportedRoles))
            ) {
              setUser(result.user);

              onLoginSuccess && (await onLoginSuccess(result));

              toast.success(`${t("login.messages.success")}`);
            } else {
              toast.error(t("login.messages.permissionDenied"));
            }
          }
        })
        .catch(async (error) => {
          let errorMessage = "errors.otherErrors";

          if (error.message) {
            errorMessage = `errors.${error.message}`;
          }

          onLoginFailed && (await onLoginFailed(error));

          toast.error(t(errorMessage, { ns: "errors" }));
        });

      setLoading(false);
    }
  };

  return (
    <Form validationSchema={LoginFormSchema} onSubmit={handleLoginSubmit}>
      <Email
        label={t("login.form.email.label")}
        name="email"
        placeholder={t("login.form.email.placeholder")}
      />
      <Password label={t("login.form.password.label")} name="password" />
      <SubmitButton label={t("login.form.actions.submit")} loading={loading} />
    </Form>
  );
};

export default LoginForm;

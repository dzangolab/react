import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import * as zod from "zod";

import { PasswordConfirmationSchema } from "./schemas";
import SignupFormFields from "./SignupFormFields";

import type { LoginCredentials, SignInUpPromise } from "../types";
import { signup, useUser } from "..";
import { toast } from "react-toastify";

interface Properties {
  email?: string;
  handleSubmit?: (credentials: LoginCredentials) => void;
  loading?: boolean;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
}

const SignupForm = ({
  email,
  handleSubmit,
  onSignupFailed,
  onSignupSuccess,
}: Properties) => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();

  const SignUpFormSchema = zod
    .object({
      email: emailSchema({
        invalid: t("validation.messages.validEmail"),
        required: t("validation.messages.email"),
      }),
      ...PasswordConfirmationSchema({
        passwordRequiredMessage: t("signup.messages.validation.password"),
        passwordValidationMessage: t(
          "signup.messages.validation.validationMessage",
        ),
        confirmPasswordRequiredMessage: t(
          "signup.messages.validation.confirmPassword",
        ),
      }),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("signup.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    );

  const handleSignupSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      setLoading(true);

      await signup(credentials)
        .then(async (result) => {
          if (result?.user) {
            await setUser(result.user);
            onSignupSuccess && (await onSignupSuccess(result));

            toast.success(`${t("signup.messages.success")}`);
          }
        })
        .catch(async (error) => {
          const errorMessage = t("errors.otherErrors", { ns: "errors" });

          onSignupFailed && (await onSignupFailed(error));

          if (error.name) {
            throw error as Error;
          }

          toast.error(error.message || errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Provider
      onSubmit={handleSignupSubmit}
      defaultValues={{
        password: "",
        email: email || "",
        confirmPassword: "",
        termsAndConditions: false,
      }}
      validationSchema={SignUpFormSchema}
    >
      <SignupFormFields readOnlyEmailField={!!email} loading={loading} />
    </Provider>
  );
};

export default SignupForm;

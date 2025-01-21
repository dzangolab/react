import { useTranslation } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/constants";
import { signup } from "@/supertokens";
import { LinkType } from "@/types/types";

import { AuthLinks } from "./AuthLinks";
import SignupForm from "./SignupForm";
import { useConfig, useUser } from "../hooks";

import type { LoginCredentials, SignInUpPromise } from "../types";

interface IProperties {
  handleSubmit?: (credentials: LoginCredentials) => void;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  loading?: boolean;
  showForgotPasswordLink?: boolean;
  showLoginLink?: boolean;
}

export const SignupWrapper: React.FC<IProperties> = ({
  handleSubmit,
  onSignupFailed,
  onSignupSuccess,
  loading,
  showLoginLink = true,
  showForgotPasswordLink = true,
}) => {
  const { t } = useTranslation("user");
  const [signupLoading, setSignupLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const config = useConfig();

  const loginPath = config.customPaths?.login || DEFAULT_PATHS.LOGIN;
  const forgotPasswordPath =
    config.customPaths?.forgotPassword || DEFAULT_PATHS.FORGOT_PASSWORD;

  const links: Array<LinkType> = [
    {
      display: showLoginLink,
      label: t("signup.links.login"),
      to: loginPath,
    },
    {
      display:
        showForgotPasswordLink && config.features?.forgotPassword !== false,
      label: t("signup.links.forgotPassword"),
      to: forgotPasswordPath,
    },
  ];

  const handleSignupSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      setSignupLoading(true);

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

          if (error.status === "FIELD_ERROR") {
            throw error as Error;
          }

          toast.error(error.message || errorMessage);
        })
        .finally(() => {
          setSignupLoading(false);
        });
    }
  };

  return (
    <>
      <SignupForm
        handleSubmit={handleSignupSubmit}
        loading={handleSubmit ? loading : signupLoading}
      />
      <AuthLinks className="sign-up" links={links} />
    </>
  );
};

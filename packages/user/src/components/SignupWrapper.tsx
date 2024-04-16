import { useTranslation } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { AuthLinks } from "./AuthLinks";
import SignupForm from "./SignupForm";
import { ROUTES } from "../constants";
import { useConfig, useUser } from "../hooks";
import signup from "../supertokens/signup";

import type { LoginCredentials, SignInUpPromise } from "../types";

import { LinkType } from "@/types/types";

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
  const { user: userConfig } = useConfig();

  const links: Array<LinkType> = [
    {
      display: showLoginLink,
      to: userConfig?.routes?.login?.path || ROUTES.LOGIN,
      className: "native-link",
      label: t("signup.links.login"),
    },
    {
      display:
        showForgotPasswordLink || !userConfig?.routes?.forgotPassword?.disabled,
      to: userConfig?.routes?.forgotPassword?.path || ROUTES.FORGOT_PASSWORD,
      className: "native-link",
      label: t("signup.links.forgotPassword"),
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

          if (error.name) {
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

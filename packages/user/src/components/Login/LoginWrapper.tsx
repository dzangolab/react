import { useTranslation } from "@dzangolab/react-i18n";
import { FC } from "react";

import { LinkType } from "@/types/types";

import { LoginForm } from "./LoginForm";
import { ROUTES } from "../../constants";
import { AuthLinks } from "../AuthLinks";
import { useConfig, useLogin } from "../../hooks";

import type { LoginCredentials, SignInUpPromise } from "../../types";

interface IProperties {
  handleSubmit?: (credential: LoginCredentials) => void;
  onLoginFailed?: (error: Error) => Promise<void> | void;
  onLoginSuccess?: (user: SignInUpPromise) => Promise<void> | void;
  loading?: boolean;
  showForgotPasswordLink?: boolean;
  showSignupLink?: boolean;
}

export const LoginWrapper: FC<IProperties> = ({
  handleSubmit,
  onLoginFailed,
  onLoginSuccess,
  loading,
  showForgotPasswordLink = true,
  showSignupLink = true,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { user: userConfig } = useConfig();

  const [loginUser, { isLoading: loginLoading }] = useLogin({
    onLoginFailed,
    onLoginSuccess,
  });

  const links: Array<LinkType> = [
    {
      className: "native-link",
      display: !userConfig?.routes?.signup?.disabled && showSignupLink,
      label: t("login.links.signup"),
      to: userConfig?.routes?.signup?.path || ROUTES.SIGNUP,
    },
    {
      className: "native-link",
      display:
        !userConfig?.routes?.forgotPassword?.disabled && showForgotPasswordLink,
      label: t("login.links.forgotPassword"),
      to: userConfig?.routes?.forgotPassword?.path || ROUTES.FORGOT_PASSWORD,
    },
  ];

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      await loginUser(credentials);
    }
  };

  return (
    <>
      <LoginForm
        handleSubmit={handleLoginSubmit}
        loading={handleSubmit ? loading : loginLoading}
      />
      <AuthLinks className="login" links={links} />
    </>
  );
};

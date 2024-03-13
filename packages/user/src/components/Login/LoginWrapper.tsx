import { useTranslation } from "@dzangolab/react-i18n";
import { FC } from "react";
import { Link } from "react-router-dom";

import { LoginForm } from "./LoginForm";
import { ROUTES } from "../../constants";
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
    onSuccess: onLoginFailed,
    onFailed: onLoginSuccess,
  });

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      await loginUser(credentials);
    }
  };

  const renderLinks = () => {
    return (
      <div className="links">
        {!showSignupLink || userConfig?.routes?.signup?.disabled ? null : (
          <Link
            to={userConfig?.routes?.signup?.path || ROUTES.SIGNUP}
            className="native-link"
          >
            {t("login.links.signup")}
          </Link>
        )}
        {!showForgotPasswordLink ||
        userConfig?.routes?.forgotPassword?.disabled ? null : (
          <Link
            to={
              userConfig?.routes?.forgotPassword?.path || ROUTES.FORGOT_PASSWORD
            }
            className="native-link"
          >
            {t("login.links.forgotPassword")}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="login-wrapper">
      <LoginForm
        handleSubmit={handleLoginSubmit}
        loading={handleSubmit ? loading : loginLoading}
      />
      {renderLinks()}
    </div>
  );
};

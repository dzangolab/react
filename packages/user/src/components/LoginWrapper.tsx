import { AppConfig } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import LoginForm from "./LoginForm";
import { useUser } from "../hooks";
import { verifySessionRoles } from "../supertokens/helpers";
import login from "../supertokens/login";

import type { LoginCredentials, SignInUpPromise } from "../types";

import { ROUTES } from "@/constants";

interface IProperties {
  appConfig?: AppConfig;
  handleSubmit?: (credential: LoginCredentials) => void;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  loading?: boolean;
  showLinks?: boolean;
}

export const LoginWrapper: FC<IProperties> = ({
  appConfig,
  handleSubmit,
  onLoginFailed,
  onLoginSuccess,
  loading,
  showLinks = true,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      setLoginLoading(true);

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

      setLoginLoading(false);
    }
  };

  const renderLinks = () => {
    if (showLinks) {
      return (
        <div className="links">
          {appConfig?.user?.routes?.signup?.disabled ? null : (
            <Link
              to={appConfig?.user.routes?.signup?.path || ROUTES.SIGNUP}
              className="native-link"
            >
              {t("login.links.signup")}
            </Link>
          )}
          {appConfig?.user?.routes?.forgetPassword?.disabled ? null : (
            <Link
              to={
                appConfig?.user.routes?.forgetPassword?.path ||
                ROUTES.FORGET_PASSWORD
              }
              className="native-link"
            >
              {t("login.links.forgotPassword")}
            </Link>
          )}
        </div>
      );
    }

    return null;
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

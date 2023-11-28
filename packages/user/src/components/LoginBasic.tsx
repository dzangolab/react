import { useTranslation } from "@dzangolab/react-i18n";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import LoginForm from "./LoginForm";
import { useConfig, useUser } from "../hooks";
import { verifySessionRoles } from "../supertokens/helpers";
import login from "../supertokens/login";

import type { LoginCredentials, SignInUpPromise } from "../types";

// eslint-disable-next-line import/no-unresolved
import { ROUTES } from "@/constants";

interface IProperties {
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  handleLoginSubmit?: (credentials: LoginCredentials) => void;
  links?: ReactNode;
}

export const LoginBasic: React.FC<IProperties> = ({
  onLoginFailed,
  onLoginSuccess,
  handleLoginSubmit,
  links,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (credentials: LoginCredentials) => {
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
  };

  const getLinks = () => {
    if (links) {
      return links;
    }

    return (
      <>
        {appConfig.user?.routes?.signup?.disabled ? null : (
          <Link
            to={appConfig.user.routes?.signup?.path || ROUTES.SIGNUP}
            className="native-link"
          >
            {t("login.links.signup")}
          </Link>
        )}
        {appConfig.user?.routes?.forgetPassword?.disabled ? null : (
          <Link
            to={
              appConfig.user.routes?.forgetPassword?.path ||
              ROUTES.FORGET_PASSWORD
            }
            className="native-link"
          >
            {t("login.links.forgotPassword")}
          </Link>
        )}
      </>
    );
  };

  return (
    <>
      <LoginForm
        handleSubmit={handleLoginSubmit ? handleLoginSubmit : handleSubmit}
        loading={loading}
      />
      <div className="login-basic-links">{getLinks()}</div>
    </>
  );
};

import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, Page } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import GoogleLogin from "../components/GoogleLogin";
import LoginForm from "../components/LoginForm";
import { ROUTES } from "../constants";
import { useConfig, useUser } from "../hooks";
import { verifySessionRoles } from "../supertokens/helpers";
import login from "../supertokens/login";

import type { LoginCredentials, SignInUpPromise } from "../types";

interface IProperties {
  customDivider?: React.ReactNode;
  divider?: boolean;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  orientation?: "horizontal" | "vertical";
  socialLoginFirst?: boolean;
}

const Login: React.FC<IProperties> = ({
  customDivider,
  divider = true,
  onLoginFailed,
  onLoginSuccess,
  orientation = "vertical",
  socialLoginFirst = false,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const searchParameters = new URLSearchParams(location.search);
  const navigate = useNavigate();

  let className = "login";

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);

    await login(credentials)
      .then(async (result) => {
        if (result?.user) {
          if (
            appConfig &&
            (await verifySessionRoles(appConfig.user.supportedRoles))
          ) {
            await setUser(result.user);

            onLoginSuccess && (await onLoginSuccess(result));

            toast.success(`${t("login.messages.success")}`);

            if (searchParameters) {
              navigate(`/verify-email?${searchParameters}`);
            }
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

  if (!appConfig?.user.supportedLoginProviders) {
    orientation = "vertical";
  }

  if (appConfig?.user.supportedLoginProviders) {
    className = className + (socialLoginFirst ? " sso-first" : " sso-last");
  }

  return (
    <Page
      title={t("login.title")}
      className={className}
      data-aria-orientation={orientation}
    >
      <LoginForm handleSubmit={handleSubmit} loading={loading} />

      <div className="links">{getLinks()}</div>

      {appConfig?.user.supportedLoginProviders ? (
        <>
          {divider ? (
            customDivider ? (
              customDivider
            ) : (
              <>
                <Divider orientation="horizontal" />
                <Divider orientation="vertical" />
              </>
            )
          ) : null}

          <div className="social-login-wrapper">
            {appConfig.user.supportedLoginProviders.includes("google") ? (
              <GoogleLogin
                label={t("login.button.googleLoginLabel")}
                redirectUrl={`${appConfig.websiteDomain}/auth/callback/google`}
              />
            ) : null}
          </div>
        </>
      ) : null}
    </Page>
  );
};

export default Login;

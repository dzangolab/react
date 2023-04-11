import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import GoogleLogin from "../components/GoogleLogin";
import LoginForm from "../components/LoginForm";
import RedirectionMessage from "../components/RedirectionMessage";
import { setUserData } from "../helpers";
import { useConfig, useUser } from "../hooks";
import login, { verifySession } from "../supertokens/login";

import type { LoginCredentials, SignInUpPromise } from "../types";

import "../assets/css/login.css";

interface IProperties {
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
}

const Login: React.FC<IProperties> = ({ onLoginFailed, onLoginSuccess }) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [showRedirectionMessage, setShowRedirectionMessage] =
    useState<boolean>(false);

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);

    await login(credentials)
      .then(async (result) => {
        if (result?.user) {
          if (
            appConfig &&
            (await verifySession(appConfig.user.supportedRoles))
          ) {
            await setUserData(result.user);
            setUser(result.user);
            setShowRedirectionMessage(false);
            onLoginSuccess && (await onLoginSuccess(result));

            toast.success(`${t("login.messages.success")}`);
          } else {
            setShowRedirectionMessage(true);
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
        {appConfig?.user?.routes?.signup?.disabled ? null : (
          <Link to={appConfig?.user?.routes?.signup?.path || "/signup"}>
            {t("login.links.signup")}
          </Link>
        )}
        {appConfig?.user?.routes?.forgetPassword?.disabled ? null : (
          <Link
            to={
              appConfig?.user?.routes?.forgetPassword?.path ||
              "/forget-password"
            }
          >
            {t("login.links.forgotPassword")}
          </Link>
        )}
      </>
    );
  };

  return (
    <div className="login">
      <Page title={t("login.title")}>
        {showRedirectionMessage ? (
          <RedirectionMessage
            appLink={appConfig?.user.redirectTo.appURL || ""}
            appName={appConfig?.user.redirectTo.appName || ""}
            hideRedirectionMessage={() => setShowRedirectionMessage(false)}
          />
        ) : null}
        <LoginForm handleSubmit={handleSubmit} loading={loading} />
        <div className="links">{getLinks()}</div>

        {appConfig?.user.supportedLoginProviders ? (
          <>
            <div className="divider">- - - - - OR - - - - -</div>
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
    </div>
  );
};

export default Login;

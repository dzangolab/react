import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import GoogleLogin from "../components/GoogleLogin";
import LoginForm from "../components/LoginForm";
import RedirectionMessage from "../components/RedirectionMessage";
import { setUserData } from "../helpers";
import { useConfig, useUser } from "../hooks";
import login, { verifySession } from "../supertokens/login";

import type { LoginCredentials } from "../types";

import "../assets/css/login.css";

const Login = () => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [showRedirectionMessage, setShowRedirectionMessage] =
    useState<boolean>(false);

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);

    const result = await login(credentials).catch((err) => {
      let errorMessage = "errors.otherErrors";

      if (err.message) {
        errorMessage = `errors.${err.message}`;
      }

      toast.error(t(errorMessage, { ns: "errors" }));
    });

    if (result?.user) {
      if (appConfig && (await verifySession(appConfig.user.appContext))) {
        await setUserData(result.user);
        setUser(result.user);
        setShowRedirectionMessage(false);
        toast.success(`${t("login.messages.success")}`);
      } else {
        setShowRedirectionMessage(true);
      }
    }
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
        {appConfig?.user.supportedLoginProviders &&
        appConfig.user.supportedLoginProviders.includes("google") ? (
          <GoogleLogin
            className="google-button"
            label={t("login.button.googleLoginLabel")}
            redirectUrl={`${appConfig.websiteDomain}/auth/callback/google`}
          />
        ) : (
          <></>
        )}
        <div className="links">{getLinks()}</div>
      </Page>
    </div>
  );
};

export default Login;

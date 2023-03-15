import { configContext } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import GoogleLogin from "@/components/GoogleLogin";
import LoginForm from "@/components/LoginForm";
import RedirectionMessage from "@/components/RedirectionMessage";
import login, { verifySession } from "@/supertokens/login";

import { userContext } from "../context/UserProvider";

import type { LoginCredentials, UserContextType } from "@/types";

import "../assets/css/login.css";

const Login = () => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useContext(userContext) as UserContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [showRedirectionMessage, setShowRedirectionMessage] =
    useState<boolean>(false);

  const appConfig = useContext(configContext);

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);

    const result = await login(credentials).catch((err) => {
      let errorMessage = t("errors.otherErrors", { ns: "errors" });
      if (err.message) {
        errorMessage = t(`errors.${err.message}`, { ns: "errors" });
      }
      toast.error(errorMessage);
    });

    if (result?.user) {
      if (appConfig && (await verifySession(appConfig.user.appContext))) {
        setUser(result?.user);
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
        {appConfig?.supportedLoginProviders &&
        appConfig.supportedLoginProviders.includes("google") ? (
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

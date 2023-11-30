import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, Page } from "@dzangolab/react-ui";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { LoginWrapper } from "..";
import GoogleLogin from "../components/GoogleLogin";
import LoginForm from "../components/LoginForm";
import { useConfig, useUser } from "../hooks";
import { verifySessionRoles } from "../supertokens/helpers";
import login from "../supertokens/login";

import type { SignInUpPromise } from "../types";

// eslint-disable-next-line import/no-unresolved
import { Links } from "@/components/Links";

interface IProperties {
  customDivider?: React.ReactNode;
  divider?: boolean;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  orientation?: "horizontal" | "vertical";
  sessionInfoIcon?: string;
  showSessionInfoIcon?: boolean;
  socialLoginFirst?: boolean;
}

const Login: React.FC<IProperties> = ({
  sessionInfoIcon = "pi pi-info-circle",
  showSessionInfoIcon = true,
  customDivider,
  divider = true,
  onLoginFailed,
  onLoginSuccess,
  orientation = "vertical",
  socialLoginFirst = false,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const appConfig = useConfig();
  const location = useLocation();

  let className = "login";
  let path: string | null = null;

  path = useMemo(() => {
    if (location.search.startsWith("?redirect=")) {
      const urlParameters = new URLSearchParams(location.search);
      path = urlParameters.get("redirect");

      return path;
    }

    return null;
  }, [location.search]);

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

  const renderRedirectionMessage = () => {
    if (path && path.length) {
      return (
        <div className="redirect-message">
          <span className="info-icon">
            {showSessionInfoIcon && <i className={sessionInfoIcon} />}
          </span>
          {t("emailVerification.messages.unauthenticated")}
        </div>
      );
    }

    return null;
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
      <LoginWrapper
        onLoginFailed={onLoginFailed}
        onLoginSuccess={onLoginSuccess}
      />

      {renderRedirectionMessage()}

      <div className="links">
        <Links />
      </div>

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

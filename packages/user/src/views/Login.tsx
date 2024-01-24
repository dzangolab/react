import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, Page } from "@dzangolab/react-ui";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getIsFirstUser } from "@/api/user";
import { ROUTES } from "@/constants";

import { LoginWrapper } from "..";
import GoogleLogin from "../components/GoogleLogin";
import { useConfig } from "../hooks";

import type { SignInUpPromise } from "../types";

interface IProperties {
  customDivider?: React.ReactNode;
  divider?: boolean;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  orientation?: "horizontal" | "vertical";
  sessionInfoIcon?: string;
  showSessionInfoIcon?: boolean;
  showForgotPasswordLink?: boolean;
  showSignupLink?: boolean;
  socialLoginFirst?: boolean;
}

const Login: React.FC<IProperties> = ({
  sessionInfoIcon = "pi pi-info-circle",
  showSessionInfoIcon = true,
  showForgotPasswordLink,
  showSignupLink,
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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (
      appConfig?.user?.routes?.signup?.disabled &&
      !appConfig?.user?.routes?.signupFirstUser?.disabled
    ) {
      setLoading(true);
      getIsFirstUser(appConfig?.apiBaseUrl || "")
        .then((response) => {
          if (response?.signUp) {
            navigate(
              appConfig.user.routes?.signupFirstUser?.path ||
                ROUTES.SIGNUP_FIRST_USER,
            );
          }
        })
        .catch(() => {
          // do nothing
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

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
      loading={loading}
    >
      <LoginWrapper
        onLoginFailed={onLoginFailed}
        onLoginSuccess={onLoginSuccess}
        showForgotPasswordLink={showForgotPasswordLink}
        showSignupLink={showSignupLink}
      />

      {renderRedirectionMessage()}

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

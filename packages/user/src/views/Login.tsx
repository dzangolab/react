import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, Page } from "@dzangolab/react-ui";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import GoogleLogin from "../components/GoogleLogin";
import LoginForm from "../components/LoginForm";
import { useConfig, useUser } from "../hooks";
import { verifySessionRoles } from "../supertokens/helpers";
import login from "../supertokens/login";

import type { LoginCredentials, SignInUpPromise } from "../types";

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
  const { setUser } = useUser();
  const appConfig = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
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
      <LoginForm handleSubmit={handleSubmit} loading={loading} />

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

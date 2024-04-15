import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, AuthPage } from "@dzangolab/react-ui";
import { Link, useNavigate } from "react-router-dom";

import { LoginWrapperV2 } from "@/components/Login/LoginWrapperV2";
import { ROUTES } from "@/constants";

import { SocialLogins } from "../components/Login";
import { useConfig, useFirstUserSignup } from "../hooks";

import type { SignInUpPromise } from "../types";

interface IProperties {
  centered?: boolean;
  customDivider?: React.ReactNode;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  orientation?: "horizontal" | "vertical";
  showForgotPasswordLink?: boolean;
  showSignupLink?: boolean;
  socialLoginFirst?: boolean;
  socialLoginOnly?: boolean;
}

export const Login: React.FC<IProperties> = ({
  centered = true,
  showForgotPasswordLink = true,
  showSignupLink = true,
  customDivider,
  onLoginFailed,
  onLoginSuccess,
  orientation = "horizontal",
  socialLoginFirst = false,
  socialLoginOnly = false,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const appConfig = useConfig();
  const navigate = useNavigate();
  const { user: userConfig } = useConfig();

  const [redirecting] = useFirstUserSignup({
    appConfig,
    autoRedirect: true,
    redirectFn: navigate,
  });

  let className = "login";

  if (!appConfig?.user.supportedLoginProviders) {
    orientation = "vertical";
  }

  if (appConfig?.user.supportedLoginProviders) {
    className = className + (socialLoginFirst ? " sso-first" : " sso-last");
  }

  const renderSocialLogins = () => {
    if (!appConfig?.user.supportedLoginProviders?.length) {
      return null;
    }

    if (socialLoginOnly) {
      return <SocialLogins />;
    }

    return (
      <>
        {customDivider ? (
          customDivider
        ) : (
          <Divider
            orientation={orientation === "vertical" ? "horizontal" : "vertical"}
          />
        )}

        <SocialLogins />
      </>
    );
  };

  const renderLinks = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <AuthPage
      centered={centered}
      className={className}
      title={t("login.title")}
      links={renderLinks()}
      loading={!!redirecting}
      form={
        <LoginWrapperV2
          onLoginFailed={onLoginFailed}
          onLoginSuccess={onLoginSuccess}
        />
      }
    >
      {renderSocialLogins()}
    </AuthPage>
  );
};

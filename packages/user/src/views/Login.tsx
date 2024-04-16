import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, AuthPage } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { LoginWrapper, SocialLogins } from "../components/Login";
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

  return (
    <AuthPage
      centered={centered}
      className={className}
      title={t("login.title")}
      loading={!!redirecting}
    >
      <LoginWrapper
        onLoginFailed={onLoginFailed}
        onLoginSuccess={onLoginSuccess}
        showForgotPasswordLink={showForgotPasswordLink}
        showSignupLink={showSignupLink}
      />
      {renderSocialLogins()}
    </AuthPage>
  );
};

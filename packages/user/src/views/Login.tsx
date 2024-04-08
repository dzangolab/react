import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, Page } from "@dzangolab/react-ui";
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
  showForgotPasswordLink,
  showSignupLink,
  customDivider,
  onLoginFailed,
  onLoginSuccess,
  orientation = "vertical",
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
      return socialLoginOnly ? (
        <span role="alert">{t("login.social.alert")}</span>
      ) : null;
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
    <Page
      title={t("login.title")}
      className={className}
      data-aria-orientation={orientation}
      loading={!!redirecting}
      centered={centered}
    >
      {socialLoginOnly ? null : (
        <LoginWrapper
          onLoginFailed={onLoginFailed}
          onLoginSuccess={onLoginSuccess}
          showForgotPasswordLink={showForgotPasswordLink}
          showSignupLink={showSignupLink}
        />
      )}

      {renderSocialLogins()}
    </Page>
  );
};

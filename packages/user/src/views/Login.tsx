import { useTranslation } from "@dzangolab/react-i18n";
import { Divider, Page } from "@dzangolab/react-ui";
import { AuthPage } from "@dzangolab/react-ui";
import { useState } from "react";
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
  const [links, setLinks] = useState<React.ReactNode>();

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

  const getLinks = (_links: React.ReactNode) => {
    setLinks(_links);
  };

  return (
    <AuthPage
      className={className}
      title={t("login.title")}
      // links={links}
      loading={!!redirecting}
      form={
        <LoginWrapper
          onLoginFailed={onLoginFailed}
          onLoginSuccess={onLoginSuccess}
          showForgotPasswordLink={showForgotPasswordLink}
          showSignupLink={showSignupLink}
          // getLinks={getLinks}
        />
      }
    >
      {renderSocialLogins()}
    </AuthPage>
    // <Page
    //   title={t("login.title")}
    //   className={className}
    //   data-aria-orientation={orientation}
    //   loading={!!redirecting}
    //   centered={centered}
    // >
    //   {socialLoginOnly ? null : (
    //     <LoginWrapper
    //       onLoginFailed={onLoginFailed}
    //       onLoginSuccess={onLoginSuccess}
    //       showForgotPasswordLink={showForgotPasswordLink}
    //       showSignupLink={showSignupLink}
    //       // getLinks={getLinks}
    //     />
    //   )}

    // </Page>
  );
};

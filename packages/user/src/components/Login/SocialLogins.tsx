import { useTranslation } from "@dzangolab/react-i18n";

import { useConfig } from "@/hooks";

import GoogleLogin from "../GoogleLogin";

export const SUPPORTED_SOCIAL_LOGIN_PROVIDERS = [
  "google" as const,
  // "facebook" as const,
];

export type SocialLoginType = (typeof SUPPORTED_SOCIAL_LOGIN_PROVIDERS)[number];

export const SocialLogins = () => {
  const { t } = useTranslation("user");

  const appConfig = useConfig();

  if (!appConfig?.user?.supportedLoginProviders?.length) {
    return null;
  }

  const renderGoogleLogin = () => {
    return (
      <GoogleLogin
        label={t("login.social.google")}
        redirectUrl={`${appConfig.websiteDomain}/auth/callback/google`}
      />
    );
  };

  const providerMap = {
    google: renderGoogleLogin,
  };

  const renderSocialLoginProvider = (provider: SocialLoginType) => {
    const renderer = providerMap[provider];

    return renderer ? renderer() : null;
  };

  return (
    <div className="social-login-wrapper">
      {appConfig.user.supportedLoginProviders.map((provider) => {
        return renderSocialLoginProvider(provider);
      })}
    </div>
  );
};

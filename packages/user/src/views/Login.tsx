import { AppConfig, configContext } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useContext } from "react";
import { toast } from "react-toastify";

import GoogleLogin from "@/components/GoogleLogin";
import LoginForm from "@/components/LoginForm";
import login from "@/supertokens/login";

import { userContext } from "../context/UserProvider";

import type { LoginCredentials, UserContextType } from "@/types";

import "../assets/css/login.css";

interface Properties {
  config: AppConfig;
}

const Login = (properties: Properties) => {
  const { t } = useTranslation("user");
  const { setUser } = useContext(userContext) as UserContextType;
  const appConfig = useContext(configContext);

  const handleSubmit = async (credentials: LoginCredentials) => {
    const result = await login(credentials);

    setUser(result?.user);

    if (result && result.user) {
      toast.success(`${t("login.messages.success")}`);
    }
  };

  return (
    <div className="login">
      <Page title={t("login.title")}>
        <LoginForm handleSubmit={handleSubmit} />
        <GoogleLogin
          className="google-button"
          label={t("login.button.googleLoginLabel")}
          redirectUrl={`${appConfig?.websiteDomain}/auth/callback/google`}
        />
        <div className="links">
          <a href="/signup">{t("login.links.signup")}</a>
          <a href="/forget-password">{t("login.links.forgotPassword")}</a>
        </div>
      </Page>
    </div>
  );
};

export default Login;

import { configContext } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import GoogleLogin from "@/components/GoogleLogin";
import LoginForm from "@/components/LoginForm";
import login from "@/supertokens/login";

import type { LoginCredentials } from "@/types";

import "../assets/css/login.css";
import { getUser } from "../redux/reducer/AuthSlice";

const Login = () => {
  const { t } = useTranslation("user");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const appConfig = useContext(configContext);

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);
    const result = await login(credentials);
    setLoading(false);
    dispatch(getUser() as any);
    if (result && result.user) {
      toast.success(`${t("login.messages.success")}`);
    }
  };

  return (
    <div className="login">
      <Page title={t("login.title")}>
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
        <div className="links">
          <Link to="/signup">{t("login.links.signup")}</Link>
          <Link to="/forget-password">{t("login.links.forgotPassword")}</Link>
        </div>
      </Page>
    </div>
  );
};

export default Login;

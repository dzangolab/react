import { configContext } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SignupForm from "@/components/SignupForm";
import useUser from "@/hooks/useUser";

import signup from "../supertokens/signup";

import type { LoginCredentials } from "@/types/types";

import "../assets/css/signup.css";

const Signup = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const appConfig = useContext(configContext);

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);
    const result = await signup(credentials);
    setUser(result?.user);
    setLoading(false);

    if (result && result.user) {
      toast.success(`${t("signup.messages.success")}`);
    }
  };

  const getLinks = () => {
    return (
      <>
        <Link to="/login">{t("signup.links.login")}</Link>
        {appConfig?.user?.routes?.forgetPassword?.disabled ? null : (
          <Link
            to={
              appConfig?.user?.routes?.forgetPassword?.path ||
              "/forget-password"
            }
          >
            {t("signup.links.forgotPassword")}
          </Link>
        )}
      </>
    );
  };

  return (
    <div className="signup">
      <Page title={t("signup.title")}>
        <SignupForm handleSubmit={handleSubmit} loading={loading} />
        <div className="links">{getLinks()}</div>
      </Page>
    </div>
  );
};

export default Signup;

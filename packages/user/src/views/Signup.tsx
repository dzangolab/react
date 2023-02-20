import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SignupForm from "@/components/SignupForm";

import { userContext } from "../context/UserProvider";
import signup from "../supertokens/signup";

import type { LoginCredentials, UserContextType } from "@/types/types";

import "../assets/css/signup.css";

const Signup = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(userContext) as UserContextType;

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);
    const result = await signup(credentials);
    setUser(result?.user);
    setLoading(false);

    if (result && result.user) {
      toast.success(`${t("signup.messages.success")}`);
    }
  };

  return (
    <div className="signup">
      <Page title={t("signup.title")}>
        <SignupForm handleSubmit={handleSubmit} loading={loading} />

        <div className="links">
          <Link to="/login">{t("signup.links.login")}</Link>
          <Link to="/forget-password">{t("signup.links.forgotPassword")}</Link>
        </div>
      </Page>
    </div>
  );
};

export default Signup;

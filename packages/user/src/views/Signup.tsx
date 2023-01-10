import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SignupForm from "@/components/SignupForm";

import { getUser } from "../redux/reducer/AuthSlice";
import signup from "../supertokens/signup";

import type { LoginCredentials } from "@/types";

import "../assets/css/signup.css";

const Signup = () => {
  const { t } = useTranslation("user");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);
    const result = await signup(credentials);
    dispatch(getUser() as any);
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

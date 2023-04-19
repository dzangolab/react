import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SignupForm from "../components/SignupForm";
import { getComputedRoute, setUserData } from "../helpers";
import { useConfig, useUser } from "../hooks";
import signup from "../supertokens/signup";

import type { LoginCredentials, SignInUpPromise } from "../types";

import "../assets/css/signup.css";

interface IProperties {
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
}

const Signup: React.FC<IProperties> = ({ onSignupFailed, onSignupSuccess }) => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const { user: userConfig } = useConfig();

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);

    await signup(credentials)
      .then(async (result) => {
        if (result?.user) {
          await setUserData(result.user);
          setUser(result.user);
          onSignupSuccess && (await onSignupSuccess(result));

          toast.success(`${t("signup.messages.success")}`);
        }
      })
      .catch(async (error) => {
        let errorMessage = t("errors.otherErrors", { ns: "errors" });

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        onSignupFailed && (await onSignupFailed(error));

        toast.error(errorMessage);
      });

    setLoading(false);
  };

  const getLinks = () => {
    return (
      <>
        <Link to={getComputedRoute(userConfig, "login") || "/login"}>
          {t("signup.links.login")}
        </Link>
        {userConfig?.routes?.forgetPassword?.disabled ? null : (
          <Link
            to={
              getComputedRoute(userConfig, "forgetPassword") ||
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

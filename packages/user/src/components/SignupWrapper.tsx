import { useTranslation } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import { toast } from "react-toastify";

import SignupForm from "./SignupForm";
import { useConfig, useUser } from "../hooks";
import signup from "../supertokens/signup";

import type { LoginCredentials, SignInUpPromise } from "../types";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants";

interface IProperties {
  handleSubmit?: (credentials: LoginCredentials) => void;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  loading?: boolean;
  showLinks?: boolean;
}

export const SignupWrapper: React.FC<IProperties> = ({
  handleSubmit,
  onSignupFailed,
  onSignupSuccess,
  loading,
  showLinks = true,
}) => {
  const { t } = useTranslation("user");
  const [signupLoading, setSignupLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const appConfig = useConfig();

  const handleSignupSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      setSignupLoading(true);

      await signup(credentials)
        .then(async (result) => {
          if (result?.user) {
            await setUser(result.user);
            onSignupSuccess && (await onSignupSuccess(result));

            toast.success(`${t("signup.messages.success")}`);
          }
        })
        .catch(async (error) => {
          const errorMessage = t("errors.otherErrors", { ns: "errors" });

          onSignupFailed && (await onSignupFailed(error));

          if (error.name) {
            throw error as Error;
          }

          toast.error(error.message || errorMessage);
        })
        .finally(() => {
          setSignupLoading(false);
        });
    }
  };

  const getLinks = () => {
    if (showLinks) {
      return (
        <div className="links">
          {appConfig.user?.routes?.signup?.disabled ? null : (
            <Link
              to={appConfig.user.routes?.signup?.path || ROUTES.SIGNUP}
              className="native-link"
            >
              {t("login.links.signup")}
            </Link>
          )}
          {appConfig.user?.routes?.forgetPassword?.disabled ? null : (
            <Link
              to={
                appConfig.user.routes?.forgetPassword?.path ||
                ROUTES.FORGET_PASSWORD
              }
              className="native-link"
            >
              {t("login.links.forgotPassword")}
            </Link>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="signup-wrapper">
      <SignupForm
        handleSubmit={handleSignupSubmit}
        loading={handleSubmit ? loading : signupLoading}
      />
      {getLinks()}
    </div>
  );
};

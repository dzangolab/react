import { useTranslation } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SignupForm from "./SignupForm";
import { useUser } from "../hooks";
import signup from "../supertokens/signup";

import type {
  DzangolabReactUserConfig,
  LoginCredentials,
  SignInUpPromise,
} from "../types";

import { ROUTES } from "@/constants";

interface IProperties {
  handleSubmit?: (credentials: LoginCredentials) => void;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  loading?: boolean;
  showLinks?: boolean;
  userConfig?: DzangolabReactUserConfig;
  showForgetPasswordLink?: boolean;
  showLoginLink?: boolean;
}

export const SignupWrapper: React.FC<IProperties> = ({
  handleSubmit,
  onSignupFailed,
  onSignupSuccess,
  loading,
  showLoginLink = true,
  showForgetPasswordLink = true,
  userConfig,
}) => {
  const { t } = useTranslation("user");
  const [signupLoading, setSignupLoading] = useState<boolean>(false);
  const { setUser } = useUser();

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

  const renderLinks = () => {
    return (
      <div className="links">
        {showLoginLink && (
          <Link
            to={userConfig?.routes?.login?.path || ROUTES.LOGIN}
            className="native-link"
          >
            {t("signup.links.login")}
          </Link>
        )}
        {!showForgetPasswordLink ||
        userConfig?.routes?.forgetPassword?.disabled ? null : (
          <Link
            to={
              userConfig?.routes?.forgetPassword?.path || ROUTES.FORGET_PASSWORD
            }
            className="native-link"
          >
            {t("signup.links.forgotPassword")}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="signup-wrapper">
      <SignupForm
        handleSubmit={handleSignupSubmit}
        loading={handleSubmit ? loading : signupLoading}
      />
      {renderLinks()}
    </div>
  );
};

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
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
}

export const SignupBasic: React.FC<IProperties> = ({
  onSignupFailed,
  onSignupSuccess,
}) => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const { user: userConfig } = useConfig();

  const handleSubmit = async (credentials: LoginCredentials) => {
    setLoading(true);

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
        setLoading(false);
      });
  };

  const getLinks = () => {
    return (
      <>
        <Link
          to={userConfig.routes?.login?.path || ROUTES.LOGIN}
          className="native-link"
        >
          {t("signup.links.login")}
        </Link>
        {userConfig?.routes?.forgetPassword?.disabled ? null : (
          <Link
            to={
              userConfig.routes?.forgetPassword?.path || ROUTES.FORGET_PASSWORD
            }
            className="native-link"
          >
            {t("signup.links.forgotPassword")}
          </Link>
        )}
      </>
    );
  };

  return (
    <>
      <SignupForm handleSubmit={handleSubmit} loading={loading} />
      <div className="links">{getLinks()}</div>
    </>
  );
};

import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SignupForm from "../components/SignupForm";
import { ROUTES } from "../constants";
import { useConfig, useUser } from "../hooks";
import signup from "../supertokens/signup";

import type { LoginCredentials, SignInUpPromise } from "../types";

interface IProperties {
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  isPage?: boolean;
  showLinks?: boolean;
}

const Signup: React.FC<IProperties> = ({
  onSignupFailed,
  onSignupSuccess,
  isPage = true,
  showLinks = true,
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
    if (!isPage && !showLinks) {
      return null;
    }

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

  const renderContent = () => {
    if (isPage) {
      return (
        <Page className="signup" title={t("signup.title")}>
          <SignupForm handleSubmit={handleSubmit} loading={loading} />
          <div className="links">{getLinks()}</div>
        </Page>
      );
    }

    return (
      <div className="signup-wrapper">
        <SignupForm handleSubmit={handleSubmit} loading={loading} />
        <div className="links">{getLinks()}</div>
      </div>
    );
  };

  return renderContent();
};

export default Signup;

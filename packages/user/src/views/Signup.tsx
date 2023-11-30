import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";
import { Link } from "react-router-dom";

import SignupForm from "../components/SignupForm";
import { ROUTES } from "../constants";
import { useConfig } from "../hooks";
import { SignInUpPromise } from "@/types";

interface IProperties {
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
}

const Signup: React.FC<IProperties> = ({ onSignupFailed, onSignupSuccess }) => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();

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
    <Page className="signup" title={t("signup.title")}>
      <SignupForm
        onSignupFailed={onSignupFailed}
        onSignupSuccess={onSignupSuccess}
      />
      <div className="links">{getLinks()}</div>
    </Page>
  );
};

export default Signup;

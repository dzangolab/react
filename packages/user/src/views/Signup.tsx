import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage, Page } from "@dzangolab/react-ui";
import { Link } from "react-router-dom";

import type { SignInUpPromise } from "../types";

import { SignupWrapperV2 } from "@/components/SignupWrapperV2";
import { ROUTES } from "@/constants";
import { useConfig } from "@/hooks";

interface IProperties {
  centered?: boolean;
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  showForgotPasswordLink?: boolean;
  showLoginLink?: boolean;
}

export const Signup: React.FC<IProperties> = ({
  centered = true,
  onSignupFailed,
  onSignupSuccess,
  showForgotPasswordLink,
  showLoginLink,
}) => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();

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
        {!showForgotPasswordLink ||
        userConfig?.routes?.forgotPassword?.disabled ? null : (
          <Link
            to={
              userConfig?.routes?.forgotPassword?.path || ROUTES.FORGOT_PASSWORD
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
    <>
      <AuthPage
        className="signup"
        title={t("signup.title")}
        links={renderLinks()}
        form={
          <SignupWrapperV2
            onSignupFailed={onSignupFailed}
            onSignupSuccess={onSignupSuccess}
          />
        }
      ></AuthPage>
    </>
  );
};

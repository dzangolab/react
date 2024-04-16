import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";

import { SignupWrapper } from "..";

import type { SignInUpPromise } from "../types";

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
  showForgotPasswordLink = true,
  showLoginLink = true,
}) => {
  const { t } = useTranslation("user");

  return (
    <AuthPage className="signup" title={t("signup.title")} centered={centered}>
      <SignupWrapper
        onSignupFailed={onSignupFailed}
        onSignupSuccess={onSignupSuccess}
        showForgotPasswordLink={showForgotPasswordLink}
        showLoginLink={showLoginLink}
      />
    </AuthPage>
  );
};

import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

import { SignupWrapper } from "..";

import type { SignInUpPromise } from "../types";

interface IProperties {
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  showForgotPasswordLink?: boolean;
  showLoginLink?: boolean;
}

export const Signup: React.FC<IProperties> = ({
  onSignupFailed,
  onSignupSuccess,
  showForgotPasswordLink,
  showLoginLink,
}) => {
  const { t } = useTranslation("user");

  return (
    <Page
      className="signup"
      title={t("signup.title")}
      contentAlignment="center"
    >
      <SignupWrapper
        onSignupFailed={onSignupFailed}
        onSignupSuccess={onSignupSuccess}
        showForgotPasswordLink={showForgotPasswordLink}
        showLoginLink={showLoginLink}
      />
    </Page>
  );
};

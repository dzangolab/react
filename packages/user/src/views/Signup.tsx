import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

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
  showForgotPasswordLink,
  showLoginLink,
}) => {
  const { t } = useTranslation("user");

  const getLinks = (links: React.ReactNode) => {
    return links;
  };

  return (
    <Page className="signup" title={t("signup.title")} centered={centered}>
      <SignupWrapper
        onSignupFailed={onSignupFailed}
        onSignupSuccess={onSignupSuccess}
        showForgotPasswordLink={showForgotPasswordLink}
        showLoginLink={showLoginLink}
        getLinks={getLinks}
      />
    </Page>
  );
};

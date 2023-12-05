import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

import { SignupWrapper } from "..";

import type { SignInUpPromise } from "../types";

import { useConfig } from "@/hooks";

interface IProperties {
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
  showForgetPasswordLink?: boolean;
  showLoginLink?: boolean;
}

const Signup: React.FC<IProperties> = ({
  onSignupFailed,
  onSignupSuccess,
  showForgetPasswordLink,
  showLoginLink,
}) => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();

  return (
    <Page className="signup" title={t("signup.title")}>
      <SignupWrapper
        onSignupFailed={onSignupFailed}
        onSignupSuccess={onSignupSuccess}
        userConfig={userConfig}
        showForgetPasswordLink={showForgetPasswordLink}
        showLoginLink={showLoginLink}
      />
    </Page>
  );
};

export default Signup;

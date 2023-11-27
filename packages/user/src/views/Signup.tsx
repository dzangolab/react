import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Link } from "react-router-dom";

import { SignupBasic } from "..";
import { ROUTES } from "../constants";
import { useConfig } from "../hooks";

import type { SignInUpPromise } from "../types";

interface IProperties {
  onSignupFailed?: (error: Error) => void;
  onSignupSuccess?: (user: SignInUpPromise) => void;
}

const Signup: React.FC<IProperties> = ({ onSignupFailed, onSignupSuccess }) => {
  const { t } = useTranslation("user");

  return (
    <Page className="signup" title={t("signup.title")}>
      <SignupBasic
        onSignupFailed={onSignupFailed}
        onSignupSuccess={onSignupSuccess}
      />
    </Page>
  );
};

export default Signup;

import { useTranslation } from "@dzangolab/react-i18n";
import { FC, useState } from "react";
import { toast } from "react-toastify";

import { LinkType } from "@/types/types";

import { LoginForm } from "./LoginForm";
import { ROUTES } from "../../constants";
import { useConfig, useUser } from "../../hooks";
import { verifySessionRoles } from "../../supertokens/helpers";
import login from "../../supertokens/login";
import { AuthLinks } from "../AuthLinks";

import type { LoginCredentials, SignInUpPromise } from "../../types";

interface IProperties {
  handleSubmit?: (credential: LoginCredentials) => void;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  loading?: boolean;
  showForgotPasswordLink?: boolean;
  showSignupLink?: boolean;
}

export const LoginWrapper: FC<IProperties> = ({
  handleSubmit,
  onLoginFailed,
  onLoginSuccess,
  loading,
  showForgotPasswordLink = true,
  showSignupLink = true,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const { user: userConfig } = useConfig();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const links: Array<LinkType> = [
    {
      className: "native-link",
      display: showSignupLink || !userConfig?.routes?.signup?.disabled,
      label: t("login.links.signup"),
      to: userConfig?.routes?.signup?.path || ROUTES.SIGNUP,
    },
    {
      className: "native-link",
      display:
        showForgotPasswordLink || !userConfig?.routes?.forgotPassword?.disabled,
      label: t("login.links.forgotPassword"),
      to: userConfig?.routes?.forgotPassword?.path || ROUTES.FORGOT_PASSWORD,
    },
  ];

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      setLoginLoading(true);

      await login(credentials)
        .then(async (result) => {
          if (result?.user) {
            if (
              userConfig &&
              (await verifySessionRoles(userConfig.supportedRoles))
            ) {
              setUser(result.user);

              onLoginSuccess && (await onLoginSuccess(result));

              toast.success(`${t("login.messages.success")}`);
            } else {
              toast.error(t("login.messages.permissionDenied"));
            }
          }
        })
        .catch(async (error) => {
          let errorMessage = "errors.otherErrors";

          if (error.message) {
            errorMessage = `errors.${error.message}`;
          }

          onLoginFailed && (await onLoginFailed(error));

          toast.error(t(errorMessage, { ns: "errors" }));
        });

      setLoginLoading(false);
    }
  };

  return (
    <>
      <LoginForm
        handleSubmit={handleLoginSubmit}
        loading={handleSubmit ? loading : loginLoading}
      />
      <AuthLinks className="login" links={links} />
    </>
  );
};

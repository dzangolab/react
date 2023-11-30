import { useTranslation } from "@dzangolab/react-i18n";
import { FC, useState } from "react";
import { toast } from "react-toastify";

import LoginForm from "./LoginForm";
import { useConfig, useUser } from "../hooks";
import { verifySessionRoles } from "../supertokens/helpers";
import login from "../supertokens/login";

import type { LoginCredentials, SignInUpPromise } from "../types";

interface IProperties {
  handleSubmit?: (credential: LoginCredentials) => void;
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
  showLinks?: boolean;
  loading?: boolean;
}

export const LoginWrapper: FC<IProperties> = ({
  handleSubmit,
  onLoginFailed,
  onLoginSuccess,
  loading,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const appConfig = useConfig();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    if (handleSubmit) {
      handleSubmit(credentials);
    } else {
      setLoginLoading(true);

      await login(credentials)
        .then(async (result) => {
          if (result?.user) {
            if (
              appConfig &&
              (await verifySessionRoles(appConfig.user.supportedRoles))
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
    <LoginForm
      handleSubmit={handleLoginSubmit}
      loading={loading ? loading : loginLoading}
    />
  );
};

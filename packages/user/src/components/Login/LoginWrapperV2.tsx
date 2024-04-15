import { useTranslation } from "@dzangolab/react-i18n";
import { FC, useState } from "react";
import { toast } from "react-toastify";

import { LoginForm } from "./LoginForm";
import { useConfig, useUser } from "../../hooks";
import { verifySessionRoles } from "../../supertokens/helpers";
import login from "../../supertokens/login";

import type { LoginCredentials, SignInUpPromise } from "../../types";

interface IProperties {
  onLoginFailed?: (error: Error) => void;
  onLoginSuccess?: (user: SignInUpPromise) => void;
}

export const LoginWrapperV2: FC<IProperties> = ({
  onLoginFailed,
  onLoginSuccess,
}) => {
  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const { user: userConfig } = useConfig();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
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
  };

  return <LoginForm handleSubmit={handleLoginSubmit} loading={loginLoading} />;
};

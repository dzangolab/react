import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { toast } from "react-toastify";

import { useConfig } from "./useConfig";
import { useUser } from "./useUser";
import { verifySessionRoles } from "../supertokens/helpers";
import login from "../supertokens/login";

import type { LoginCredentials } from "../types";

type UseLoginConfig = {
  showToasts?: boolean;
  onLoginSuccess?: (user: any) => Promise<void> | void;
  onLoginFailed?: (error: any) => Promise<void> | void;
};

export function useLogin(config?: UseLoginConfig) {
  const { showToasts = true, onLoginFailed, onLoginSuccess } = config || {};

  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const { user: userConfig } = useConfig();

  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const loginUser = async (credentials: LoginCredentials) => {
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

            showToasts && toast.success(t("login.messages.success"));
          } else {
            showToasts && toast.error(t("login.messages.permissionDenied"));
          }
        }
      })
      .catch(async (error) => {
        let errorMessage = "errors.otherErrors";

        if (error.message) {
          errorMessage = `errors.${error.message}`;
        }

        onLoginFailed && (await onLoginFailed(error));

        showToasts && toast.error(t(errorMessage, { ns: "errors" }));
      });
  };

  return [loginLoading, loginUser] as [
    boolean,
    (credentials: LoginCredentials) => Promise<any>,
  ];
}

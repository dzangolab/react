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

type UseLoginMeta = {
  isError: boolean;
  isLoading: boolean;
};

export function useLogin(config?: UseLoginConfig) {
  const { showToasts = true, onLoginFailed, onLoginSuccess } = config || {};

  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const { user: userConfig } = useConfig();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginUser = (credentials: LoginCredentials) => {
    setIsLoading(true);

    return login(credentials)
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
            setIsError(true);
            showToasts && toast.error(t("login.messages.permissionDenied"));
          }
        }
      })
      .catch(async (error) => {
        setIsError(true);
        onLoginFailed && (await onLoginFailed(error));

        if (showToasts) {
          let errorMessage = "errors.otherErrors";

          if (error.message) {
            errorMessage = `errors.${error.message}`;
          }

          toast.error(t(errorMessage, { ns: "errors" }));
        }
      });
  };

  return [loginUser, { isError, isLoading }] as [
    (credentials: LoginCredentials) => Promise<any>,
    UseLoginMeta,
  ];
}

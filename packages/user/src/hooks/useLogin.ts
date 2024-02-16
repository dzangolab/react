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
  onSuccess?: (user: any) => Promise<void> | void;
  onFailed?: (error?: any) => Promise<void> | void;
};

type UseLoginMeta = {
  isError: boolean;
  isLoading: boolean;
};

export function useLogin(config?: UseLoginConfig) {
  const { showToasts = true, onFailed, onSuccess } = config || {};

  const { t } = useTranslation(["user", "errors"]);
  const { setUser } = useUser();
  const { user: userConfig } = useConfig();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginUser = (credentials: LoginCredentials) => {
    setIsLoading(true);

    return login(credentials)
      .then(async (response) => {
        if (response?.user) {
          if (
            userConfig &&
            (await verifySessionRoles(userConfig.supportedRoles))
          ) {
            setUser(response.user);

            onSuccess && (await onSuccess(response));

            showToasts && toast.success(t("login.messages.success"));
          } else {
            setIsError(true);
            onFailed && (await onFailed(response));

            showToasts && toast.error(t("login.messages.permissionDenied"));
          }
        }
      })
      .catch(async (error) => {
        setIsError(true);
        onFailed && (await onFailed(error));

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

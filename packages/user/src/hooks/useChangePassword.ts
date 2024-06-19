import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { toast } from "react-toastify";

import { useConfig } from "./useConfig";
import { changePassword as changePasswordApi } from "../api/user";

import type { ChangePasswordInputType } from "../types";

type UseChangePasswordConfig = {
  showToasts?: boolean;
  onSuccess?: (user: any) => Promise<void> | void;
  onFailed?: (error: any) => Promise<void> | void;
};

type UseChangePasswordMeta = {
  isError: boolean;
  isLoading: boolean;
};

export function useChangePassword(config?: UseChangePasswordConfig) {
  const { showToasts = true, onFailed, onSuccess } = config || {};

  const { t } = useTranslation(["user", "errors"]);
  const appConfig = useConfig();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changePassword = (passwords: ChangePasswordInputType) => {
    setIsLoading(true);

    return changePasswordApi(passwords, appConfig?.apiBaseUrl || "")
      .then(async (response) => {
        setIsLoading(false);

        if ("data" in response && response.data.status === "OK") {
          onSuccess && (await onSuccess(response));

          showToasts && toast.success(t("changePassword.messages.success"));
        } else {
          // TODO better handle errors
          setIsError(true);

          onFailed && (await onFailed(response));

          showToasts && toast.error(response.data.message);
        }
      })
      .catch(async (error) => {
        setIsError(true);
        setIsLoading(false);

        onFailed && (await onFailed(error));

        showToasts && toast.error(`${t("changePassword.messages.error")}`);
      });
  };

  return [changePassword, { isError, isLoading }] as [
    (passwords: ChangePasswordInputType) => Promise<any>,
    UseChangePasswordMeta,
  ];
}

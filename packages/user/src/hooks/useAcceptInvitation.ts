import { useTranslation } from "@dzangolab/react-i18n";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  acceptInvitation as acceptInvitationApi,
  getInvitationByToken,
} from "@/api/invitation";

import { useConfig } from "./useConfig";
import { useLogin } from "./useLogin";

import type { Invitation, LoginCredentials } from "../types";

type UseAcceptInvitationConfig = {
  autoLogin?: boolean;
  showToasts?: boolean;
  tokenParamKey?: string;
  onSuccess?: (user: any) => Promise<void> | void;
  onFailed?: (error?: any) => Promise<void> | void;
};

type UseAcceptInvitationMeta = {
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isLoginLoading: boolean;
};

export function useAcceptInvitation(config?: UseAcceptInvitationConfig) {
  const {
    autoLogin = true,
    showToasts = true,
    tokenParamKey: tokenParameterKey = "token",
    onSuccess,
    onFailed,
  } = config || {};

  const { t } = useTranslation("invitations");
  const appConfig: any = useConfig();

  const parameters = useParams();
  const token = parameters[tokenParameterKey];

  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loginUser, { isLoading: isLoginLoading }] = useLogin({ showToasts });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setIsFetching(true);
      getInvitationByToken(token, appConfig?.apiBaseUrl || "")
        .then((response) => {
          if ("data" in response && response.data.status === "ERROR") {
            // TODO better handle errors
            setIsError(true);
          } else {
            setInvitation(response as Invitation);
          }
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, []);

  const acceptInvitation = (credentials: LoginCredentials) => {
    if (!token) {
      return;
    }

    setIsLoading(true);

    return acceptInvitationApi(token, credentials, appConfig?.apiBaseUrl || "")
      .then(async (response) => {
        setIsLoading(false);

        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          setIsError(true);

          onFailed && (await onFailed(response));

          showToasts && toast.error(response.data.message);
        } else {
          onSuccess && (await onSuccess(response));

          if (autoLogin) {
            // TODO acceptInvitation should return authenticated user from api
            await loginUser(credentials);
          }
        }
      })
      .catch(async (error) => {
        setIsError(true);
        setIsLoading(false);

        onFailed && (await onFailed(error));

        showToasts &&
          toast.error(`${t("invitations.messages.errorAcceptingInvitation")}`);
      });
  };

  return [
    invitation,
    acceptInvitation,
    { isError, isFetching, isLoading, isLoginLoading },
  ] as [
    Invitation | null,
    (credentials: LoginCredentials) => Promise<void>,
    UseAcceptInvitationMeta,
  ];
}

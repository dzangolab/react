import { disableUser, enableUser } from "@/api/user";
import { useConfig } from "@/hooks";
import { UserType } from "@/types";
import { useTranslation } from "@dzangolab/react-i18n";
import { MenuItem } from "primereact/menuitem";
import { useState } from "react";
import { toast } from "react-toastify";

export const useUserActions = ({
  onUserDisabled,
  onUserEnabled,
}: {
  onUserDisabled: any;
  onUserEnabled: any;
}) => {
  const appConfig = useConfig();

  const { t } = useTranslation("users");

  const handleDisableUser = (user: any) => {
    disableUser(user.id, appConfig?.apiBaseUrl || "")
      .then((response) => {
        if ("data" in response && response.data.status === "OK") {
          toast.success(t("messages.disable.success"));

          if (onUserDisabled) {
            onUserDisabled(response);
          }
        } else {
          toast.error(t("messages.disable.error"));
        }
      })
      .catch(() => {
        toast.error(t("messages.disable.error"));
      });
  };

  const handleEnableUser = (user: any) => {
    enableUser(user.id, appConfig?.apiBaseUrl || "")
      .then((response) => {
        if ("data" in response && response.data.status === "OK") {
          toast.success(t("messages.enable.success"));

          if (onUserEnabled) {
            onUserEnabled(response);
          }
        } else {
          toast.error(t("messages.enable.error"));
        }
      })
      .catch(() => {
        toast.error(t("messages.enable.error"));
      });
  };

  return { handleDisableUser, handleEnableUser };
};

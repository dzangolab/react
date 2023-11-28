import { useTranslation } from "@dzangolab/react-i18n";
import { ActionsMenu, ConfirmationModal } from "@dzangolab/react-ui";
import { MenuItem } from "primereact/menuitem";
import { useState } from "react";
import { toast } from "react-toastify";

import { enableUser, disableUser } from "@/api/user";
import { useConfig } from "@/hooks";

type UserActionsProperites = {
  onUserEnabled?: (response: any) => void;
  onUserDisabled?: (response: any) => void;
  user: any;
};
export const UserAction = ({
  user,
  onUserEnabled,
  onUserDisabled,
}: UserActionsProperites) => {
  const appConfig = useConfig();

  const { t } = useTranslation("users");

  const [showEnableConfirmation, setShowEnableConfirmation] = useState(false);
  const [showDisableConfirmation, setShowDisableConfirmation] = useState(false);

  const actionItems: MenuItem[] = [
    {
      label: t("table.actions.enable"),
      icon: "pi pi-check",
      disabled: !user.disabled,
      command: () => {
        setShowEnableConfirmation(true);
      },
    },
    {
      label: t("table.actions.disable"),
      className: "danger",
      icon: "pi pi-times",
      disabled: user.disabled,
      command: () => {
        setShowDisableConfirmation(true);
      },
    },
  ];

  const handleDisableUser = () => {
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

  const handleEnableUser = () => {
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

  return (
    <>
      <ActionsMenu actions={actionItems} />
      <ConfirmationModal
        visible={showEnableConfirmation}
        message={t("confirmation.enable.message")}
        header={t("confirmation.header")}
        onHide={() => {
          setShowEnableConfirmation(false);
        }}
        accept={() => {
          handleEnableUser();
          setShowEnableConfirmation(false);
        }}
      />
      <ConfirmationModal
        visible={showDisableConfirmation}
        message={t("confirmation.disable.message")}
        header={t("confirmation.header")}
        onHide={() => {
          setShowDisableConfirmation(false);
        }}
        accept={() => {
          handleDisableUser();
          setShowDisableConfirmation(false);
        }}
      />
    </>
  );
};

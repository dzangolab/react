import { useTranslation } from "@dzangolab/react-i18n";
import { ActionsMenu, ConfirmationModal, Button } from "@dzangolab/react-ui";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserAction = ({
  user,
  onUserEnabled,
  onUserDisabled,
}: UserActionsProperites) => {
  const appConfig = useConfig();

  const { t } = useTranslation("users");

  const [showEnableConfirmation, setShowEnableConfirmation] = useState(false);
  const [showDisableConfirmation, setShowDisableConfirmation] = useState(false);

  let isEnableUser;
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

  const renderDialogFooter = (isEnableUser: boolean) => {
    return (
      <div className="delete-dialog-footer">
        <Button
          label={t("messages.action.reject")}
          variant="outlined"
          severity="secondary"
          onClick={() => handleCancel(isEnableUser)}
        />
        <Button
          label={t("messages.action.accept")}
          onClick={() => {
            if (isEnableUser) {
              handleEnableUser();
              setShowEnableConfirmation(false);
            } else {
              handleDisableUser();
              setShowDisableConfirmation(false);
            }
          }}
        />
      </div>
    );
  };

  const handleCancel = (isEnableUser: boolean) => {
    if (isEnableUser) {
      setShowEnableConfirmation(false);
    } else {
      setShowDisableConfirmation(false);
    }
  };

  const renderConfirmationModal = (
    showConfirmation: boolean,
    confirmationMessage: string,
    isEnableUser: boolean,
  ) => {
    return (
      <ConfirmationModal
        onHide={() => handleCancel(isEnableUser)}
        visible={showConfirmation}
        message={confirmationMessage}
        header={t("confirmation.header")}
        footer={renderDialogFooter(isEnableUser)}
      />
    );
  };

  return (
    <>
      <ActionsMenu actions={actionItems} />
      {renderConfirmationModal(
        showEnableConfirmation,
        t("confirmation.enable.message"),
        (isEnableUser = true),
      )}
      {renderConfirmationModal(
        showDisableConfirmation,
        t("confirmation.disable.message"),
        (isEnableUser = false),
      )}
    </>
  );
};

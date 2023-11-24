import { useTranslation } from "@dzangolab/react-i18n";
import { ActionsMenu, ConfirmationModal } from "@dzangolab/react-ui";
import { MenuItem } from "primereact/menuitem";
import { useState } from "react";
import { toast } from "react-toastify";

import { enableUser, disableUser } from "@/api/user";
import { useConfig } from "@/hooks";

export const UserAction = (user: any) => {
  const appConfig = useConfig();

  const { t } = useTranslation("users");

  const [showEnableConfirmation, setShowEnableConfirmation] = useState(false);
  const [showDisableConfirmation, setShowDisableConfirmation] = useState(false);

  const actionItems: MenuItem[] = [
    {
      label: t("table.actions.enable"),
      icon: "pi pi-check",
      command: () => {
        setShowEnableConfirmation(true);
      },
    },
    {
      label: t("table.actions.disable"),
      className: "danger",
      icon: "pi pi-times",
      command: () => {
        setShowDisableConfirmation(true);
      },
    },
  ];

  const handleDisableUser = () => {
    disableUser(user.user.id, appConfig?.apiBaseUrl || "")
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        toast.error("error occurred");
      });
  };

  const handleEnableUser = () => {
    enableUser(user.user.id, appConfig?.apiBaseUrl || "")
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        toast.error("error occurred");
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

import { useTranslation } from "@dzangolab/react-i18n";
import { ActionsMenu, ConfirmationModal } from "@dzangolab/react-ui";
import { MenuItem } from "primereact/menuitem";
import { useState } from "react";

export const UserAction = () => {
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
    // TODO add api logic
    console.log("disabled");
  };

  const handleEnableUser = () => {
    // TODO add api logic
    console.log("enabled");
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

import { useTranslation } from "@dzangolab/react-i18n";
import { ActionsMenu } from "@dzangolab/react-ui";
import { MenuItem } from "primereact/menuitem";

export const UserAction = () => {
  const { t } = useTranslation("users");

  const actionItems: MenuItem[] = [
    {
      label: t("table.actions.enableUser"),
      icon: "pi pi-check",
    },
    {
      label: t("table.actions.disableUser"),
      icon: "pi pi-times",
    },
  ];

  return <ActionsMenu actions={actionItems} />;
};

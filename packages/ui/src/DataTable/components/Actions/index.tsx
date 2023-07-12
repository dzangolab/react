//import { useRouter } from 'next/router';
import { ButtonProps } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React from "react";

import { Menu } from "../../../Menu";

export interface ActionsMenuProperties {
  actions?: MenuItem[];
  buttonOptions?: Omit<ButtonProps, "onClick">;
  deleteIcon?: string;
  deleteLabel?: string;
  editIcon?: string;
  editLabel?: string;
  viewIcon?: string;
  viewLabel?: string;
  onDelete?: (arguments_: any) => void;
  onEdit?: (arguments_: any) => void;
  onView?: (arguments_: any) => void;
}

export const ActionsMenu = ({
  actions,
  buttonOptions: pButtonOptions,
  deleteIcon,
  deleteLabel,
  editIcon,
  editLabel,
  viewIcon,
  viewLabel,
  onDelete,
  onEdit,
  onView,
}: ActionsMenuProperties) => {
  const buttonOptions = {
    icon: "pi pi-cog",
    ...pButtonOptions,
  };

  const items: MenuItem[] = actions ? [...actions] : [];

  if (!items.length) {
    if (onView) {
      items.push({
        label: viewLabel || "View",
        icon: viewIcon || "pi pi-external-link",
        command: onView,
      });
    }

    if (onEdit) {
      items.push({
        label: editLabel || "Edit",
        icon: editIcon || "pi pi-pencil",
        command: onEdit,
      });
    }

    if (onDelete) {
      items.push({
        label: deleteLabel || "Delete",
        icon: deleteIcon || "pi pi-trash",
        className: "danger",
        command: onDelete,
      });
    }
  }

  return <Menu model={items} buttonOptions={buttonOptions} />;
};

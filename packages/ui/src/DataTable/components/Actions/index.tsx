//import { useRouter } from 'next/router';
import { ButtonProps } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";

import { ConfirmationModal } from "@/ConfirmationModal";

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
  requireConfirmationOnDelete?: boolean;
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
  requireConfirmationOnDelete,
}: ActionsMenuProperties) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
        command: () => {
          if (requireConfirmationOnDelete) {
            setShowDeleteConfirmation(true);
          } else {
            console.log(onDelete);
          }
        },
      });
    }
  }

  return (
    <>
      <Menu model={items} buttonOptions={buttonOptions} />
      <ConfirmationModal
        visible={showDeleteConfirmation}
        message="Are you sure you want to delete?"
        onHide={() => setShowDeleteConfirmation(false)}
        accept={() => {
          console.log(onDelete);
          setShowDeleteConfirmation(false);
        }}
      />
    </>
  );
};

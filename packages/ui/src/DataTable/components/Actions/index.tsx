//import { useRouter } from 'next/router';
import { ButtonProps } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";

import { ConfirmationModal } from "../../../ConfirmationModal";
import { Menu } from "../../../Menu";

export interface ActionsMenuProperties {
  actions?: MenuItem[];
  buttonOptions?: Omit<ButtonProps, "onClick">;
  data?: object;
  deleteIcon?: string;
  deleteLabel?: string;
  editIcon?: string;
  editLabel?: string;
  deleteConfirmationHeader?: string;
  deleteConfirmationMessage?: string;
  viewIcon?: string;
  viewLabel?: string;
  requireConfirmationOnDelete?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (arguments_: any) => void | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit?: (arguments_: any) => void | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onView?: (arguments_: any) => void | Promise<void>;
}

export const ActionsMenu = ({
  actions,
  buttonOptions: pButtonOptions,
  data,
  deleteIcon,
  deleteLabel,
  editIcon,
  editLabel,
  deleteConfirmationHeader,
  deleteConfirmationMessage,
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
            onDelete(data);
          }
        },
      });
    }
  }

  return (
    <>
      <Menu model={items} buttonOptions={buttonOptions} />
      {!!onDelete && requireConfirmationOnDelete && (
        <ConfirmationModal
          visible={showDeleteConfirmation}
          message={deleteConfirmationMessage}
          header={deleteConfirmationHeader}
          onHide={() => setShowDeleteConfirmation(false)}
          accept={async () => {
            await onDelete(data);

            setShowDeleteConfirmation(false);
          }}
        />
      )}
    </>
  );
};

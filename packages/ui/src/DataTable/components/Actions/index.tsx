//import { useRouter } from 'next/router';
import { ButtonProps } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";

import { Button } from "../../../Buttons";
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
  acceptLabel?: string;
  rejectLabel?: string;
  deleteConfirmationHeader?: string;
  deleteConfirmationMessage?: string;
  viewIcon?: string;
  viewLabel?: string;
  requireConfirmationOnDelete?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (arguments_: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit?: (arguments_: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onView?: (arguments_: any) => void;
}

export const ActionsMenu = ({
  actions,
  buttonOptions: pButtonOptions,
  data,
  deleteIcon,
  deleteLabel,
  rejectLabel,
  acceptLabel,
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

  const renderDialogFooter = () => {
    return (
      <div className="delete-dialog-footer">
        <Button
          label={rejectLabel || "No"}
          variant="outlined"
          severity="secondary"
          onClick={() => setShowDeleteConfirmation(false)}
        />
        <Button
          label={acceptLabel || "Yes"}
          onClick={() => {
            onDelete?.(data);
            setShowDeleteConfirmation(false);
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Menu model={items} buttonOptions={buttonOptions} />
      {!!onDelete && requireConfirmationOnDelete && (
        <ConfirmationModal
          visible={showDeleteConfirmation}
          message={deleteConfirmationMessage}
          header={deleteConfirmationHeader}
          footer={renderDialogFooter()}
          onHide={() => setShowDeleteConfirmation(false)}
        />
      )}
    </>
  );
};

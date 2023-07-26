import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";
import React from "react";

export const ConfirmationModal = ({
  accept,
  message,
  header,
  visible,
  onHide,
  ...confirmOptions
}: ConfirmDialogProps) => {
  return (
    <>
      <ConfirmDialog
        visible={visible}
        draggable={false}
        resizable={false}
        onHide={onHide}
        accept={accept}
        message={message}
        header={header}
        icon="pi pi-exclamation-triangle"
        {...confirmOptions}
      />
    </>
  );
};

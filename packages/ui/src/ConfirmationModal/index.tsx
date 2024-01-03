import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";
import { ReactNode } from "react";

import { Button } from "..";

interface IModalProperties extends ConfirmDialogProps {
  acceptLabel?: string;
  acceptIcon?: string | ReactNode;
  rejectLabel?: string;
  rejectIcon?: string | ReactNode;
}

export const ConfirmationModal = ({
  accept,
  acceptLabel,
  acceptIcon,
  rejectLabel,
  rejectIcon,
  message,
  header,
  visible,
  onHide,
  footer,
  ...confirmOptions
}: IModalProperties) => {
  const renderFooter = () => {
    if (footer) return footer;

    return (
      <div className="delete-dialog-footer">
        <Button
          label={rejectLabel || "No"}
          variant="outlined"
          severity="secondary"
          onClick={() => onHide}
          iconLeft={rejectIcon}
        />
        <Button
          label={acceptLabel || "Yes"}
          onClick={() => {
            accept?.();
            // onHide;
          }}
          iconLeft={acceptIcon}
        />
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog
        visible={visible}
        draggable={false}
        resizable={false}
        onHide={onHide}
        message={message}
        header={header}
        footer={renderFooter()}
        icon="pi pi-exclamation-triangle"
        {...confirmOptions}
      />
    </>
  );
};

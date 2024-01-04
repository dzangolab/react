import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";
import { ReactNode } from "react";

import { Button } from "..";

interface IModalProperties extends ConfirmDialogProps {
  acceptIcon?: string | ReactNode;
  rejectIcon?: string | ReactNode;
  onHide?: () => void;
}

export const ConfirmationModal = ({
  accept,
  acceptLabel,
  acceptIcon,
  reject,
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
      <div className="dialog-footer">
        <Button
          label={rejectLabel || "No"}
          variant="outlined"
          severity="secondary"
          onClick={() => {
            reject?.();
            onHide?.();
          }}
          iconLeft={rejectIcon}
        />
        <Button
          label={acceptLabel || "Yes"}
          onClick={() => {
            accept?.();
            onHide?.();
          }}
          iconLeft={acceptIcon}
        />
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog
        className="dz-confirmation-modal"
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

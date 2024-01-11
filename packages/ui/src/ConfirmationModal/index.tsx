import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";

import { Button, IButtonProperties } from "..";

interface IModalProperties extends ConfirmDialogProps {
  onHide?: () => void;
  cancelButtonProps?: IButtonProperties;
  acceptButtonProps?: IButtonProperties;
}

export const ConfirmationModal = ({
  accept,
  acceptLabel,
  acceptButtonProps,
  reject,
  rejectLabel,
  cancelButtonProps,
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
          {...cancelButtonProps}
        />
        <Button
          label={acceptLabel || "Yes"}
          onClick={() => {
            accept?.();
            onHide?.();
          }}
          {...acceptButtonProps}
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

import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";

import { Button, IButtonProperties } from "..";

interface IModalProperties extends ConfirmDialogProps {
  onHide?: () => void;
  cancelButtonOptions?: IButtonProperties;
  acceptButtonOptions?: IButtonProperties;
}

export const ConfirmationModal = ({
  accept,
  acceptLabel,
  acceptButtonOptions,
  reject,
  rejectLabel,
  cancelButtonOptions,
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
          {...cancelButtonOptions}
        />
        <Button
          label={acceptLabel || "Yes"}
          onClick={() => {
            accept?.();
            onHide?.();
          }}
          {...acceptButtonOptions}
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

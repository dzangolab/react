import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";

import { Button, IButtonProperties } from "..";

export interface IModalProperties extends ConfirmDialogProps {
  acceptButtonOptions?: IButtonProperties;
  cancelButtonOptions?: IButtonProperties;
  onHide?: () => void;
}

export const ConfirmationModal = ({
  accept,
  acceptButtonOptions,
  reject,
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
          label="No"
          variant="outlined"
          severity="secondary"
          onClick={() => {
            reject?.();
            onHide?.();
          }}
          {...cancelButtonOptions}
        />
        <Button
          label="Yes"
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

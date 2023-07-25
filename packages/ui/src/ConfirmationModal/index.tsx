import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

type ConfirmationModalProperites = {
  handleInvitationResend?: (data: any) => void;
  handleInvitationRevoke?: (data: any) => void;
  data?: object;
  confirmMessage?: string;
  visible?: boolean;
  onHideConfirmationDialog?: () => void;
};

export const ConfirmationModal = ({
  handleInvitationResend,
  handleInvitationRevoke,
  data,
  confirmMessage,
  visible,
  onHideConfirmationDialog,
}: ConfirmationModalProperites) => {
  const handleInvitationAction = () => {
    if (handleInvitationResend) {
      handleInvitationResend(data);
    }

    if (handleInvitationRevoke) {
      handleInvitationRevoke(data);
    }
  };

  return (
    <>
      <ConfirmDialog
        visible={visible}
        draggable={false}
        resizable={false}
        onHide={onHideConfirmationDialog}
        accept={handleInvitationAction}
        message={confirmMessage}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
      />
    </>
  );
};

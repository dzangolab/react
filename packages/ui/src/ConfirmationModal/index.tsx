import React, { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

type ConfirmationModalProperites = {
  handleInvitationResend?: (data: any) => void;
  handleInvitationRevoke?: (data: any) => void;
  data?: object;
  message?: string;
  visible?: boolean;
  onCancel?: () => void;
};

export const ConfirmationModal = ({
  handleInvitationResend,
  handleInvitationRevoke,
  data,
  message,
  visible,
  onCancel,
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
        onHide={onCancel}
        accept={handleInvitationAction}
        message={message}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
      />
    </>
  );
};

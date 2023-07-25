import React, { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

type ConfirmationModalProperites = {
  handleInvitationResend?: (data: any) => void;
  handleInvitationRevoke?: (data: any) => void;
  data?: object;
};

export const ConfirmationModal = ({
  handleInvitationResend,
  handleInvitationRevoke,
  data,
}: ConfirmationModalProperites) => {
  const [visible, setVisible] = useState(true);

  console.log("Hello from the top of world");

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
        accept={handleInvitationAction}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
      />
    </>
  );
};

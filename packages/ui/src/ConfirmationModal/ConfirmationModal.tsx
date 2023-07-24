import React, { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

type InvitationActionsProperites = {
  handleInvitationResend?: (data: any) => void;
  handleInvitationRevoke?: (data: any) => void;
  data?: object;
};

export const ConfirmationModal = ({
  handleInvitationResend,
  handleInvitationRevoke,
  data,
}: InvitationActionsProperites) => {
  const [visible, setVisible] = useState(true);

  const accept = () => {
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
        accept={accept}
        onHide={() => setVisible((previous) => !previous)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
      />
    </>
  );
};

import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

export const ConfirmationModal = ({ showConfirmation = true }: any) => {
  const [visible, setVisible] = useState(showConfirmation);

  return (
    <>
      <ConfirmDialog
        visible={visible}
        draggable={false}
        resizable={false}
        onHide={() => setVisible(showConfirmation)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
      />
    </>
  );
};

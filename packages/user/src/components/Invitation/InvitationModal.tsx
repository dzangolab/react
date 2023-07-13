import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InvitationForm } from "./InvitationForm";

export const InvitationModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Invite"
        icon="pi pi-external-link"
        onClick={() => setModalVisible(true)}
      />
      <Dialog
        header="Invitation Form"
        visible={modalVisible}
        style={{ width: "20vw" }}
        onHide={() => setModalVisible(false)}
        draggable={false}
        resizable={false}
      >
        <InvitationForm handleSubmit={() => {}} onCancel={() => {}} />
      </Dialog>
    </div>
  );
};

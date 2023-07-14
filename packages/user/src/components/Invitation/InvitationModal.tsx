import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InvitationForm } from "./InvitationForm";
import { useTranslation } from "@dzangolab/react-i18n";
import type { InvitationPayload } from "../../types";

interface Properties {
  handleSubmit: (data: InvitationPayload) => void;
  loading?: boolean;
}

export const InvitationModal = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-content-center">
      <Button
        label={t("invitation.modal.button.label")}
        icon="pi pi-external-link"
        onClick={() => setModalVisible(true)}
      />
      <Dialog
        style={{ height: "22rem" }}
        header={t("invitation.modal.dialog.header")}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        draggable={false}
        resizable={false}
      >
        <InvitationForm
          handleSubmit={handleSubmit}
          onCancel={() => {
            setModalVisible(false);
          }}
          loading={loading}
        />
      </Dialog>
    </div>
  );
};

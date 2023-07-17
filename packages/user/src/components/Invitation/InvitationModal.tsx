import React, { useState } from "react";
import { Button, ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InvitationForm } from "./InvitationForm";
import { useTranslation } from "@dzangolab/react-i18n";
import type { InvitationPayload } from "../../types";
import { IconType } from "primereact/utils";

interface Properties {
  handleInvitationSubmit: (data: InvitationPayload) => void;
  loading?: boolean;
  button?: IconType<ButtonProps>;
}

export const InvitationModal = ({
  handleInvitationSubmit,
  loading,
  button,
}: Properties) => {
  const { t } = useTranslation("user");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-content-center">
      <Button
        label={t("invitation.modal.button.label")}
        icon={button}
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
          handleSubmit={handleInvitationSubmit}
          onCancel={() => {
            setModalVisible(false);
          }}
          loading={loading}
        />
      </Dialog>
    </div>
  );
};

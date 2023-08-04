import { useTranslation } from "@dzangolab/react-i18n";
import { Button, ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconType } from "primereact/utils";
import React, { useState } from "react";

import { InvitationForm } from "./InvitationForm";

import type { InvitationPayload } from "../../types";

interface Properties {
  handleSubmit: (data: InvitationPayload) => void;
  loading?: boolean;
  buttonIcon?: IconType<ButtonProps>;
}

export const InvitationModalButton = ({
  handleSubmit,
  loading,
  buttonIcon,
}: Properties) => {
  const { t } = useTranslation("user");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-content-center">
      <Button
        label={t("invitation.modal.button.label")}
        icon={buttonIcon}
        onClick={() => setModalVisible(true)}
      />
      <Dialog
        contentStyle={{ overflowY: "visible" }}
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

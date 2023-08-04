import { useTranslation } from "@dzangolab/react-i18n";
import { Button, ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconType } from "primereact/utils";
import React, { useState } from "react";

import { AddInvitationResponse } from "@/types";

import { InvitationForm } from "./InvitationForm";

interface Properties {
  onSubmitted?: (response: AddInvitationResponse) => void;
  prepareData?: (data: any) => any;
  buttonIcon?: IconType<ButtonProps>;
}

export const InvitationModal = ({
  buttonIcon,
  onSubmitted,
  prepareData,
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
          onCancel={() => {
            setModalVisible(false);
          }}
          onSubmitted={(data) => {
            if (onSubmitted) {
              onSubmitted(data);
            }

            setModalVisible(false);
          }}
          prepareData={prepareData}
        />
      </Dialog>
    </div>
  );
};

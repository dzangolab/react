import { useTranslation } from "@dzangolab/react-i18n";
import { Button, ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconType } from "primereact/utils";
import React, { useState } from "react";

import {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
} from "@/types";

import { InvitationForm } from "./InvitationForm";

interface Properties {
  apps?: InvitationAppOption[];
  roles?: InvitationRoleOption[];
  buttonIcon?: IconType<ButtonProps>;
  prepareData?: (data: any) => any;
  onSubmitted?: (response: AddInvitationResponse) => void;
}

export const InvitationModal = ({
  apps,
  buttonIcon,
  roles,
  prepareData,
  onSubmitted,
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
          apps={apps}
          roles={roles}
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

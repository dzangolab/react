import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";
import { Dialog } from "primereact/dialog";
import React, { ReactNode, useState } from "react";

import {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  AdditionalInvitationFields,
  InvitationExpiryDateField,
} from "@/types";

import { InvitationForm } from "./InvitationForm";

interface Properties {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: InvitationAppOption[];
  buttonIcon?: string | ReactNode;
  expiryDateField?: InvitationExpiryDateField;
  onSubmitted?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareData?: (data: any) => any;
  roles?: InvitationRoleOption[];
}

export const InvitationModal = ({
  additionalInvitationFields,
  apps,
  buttonIcon,
  expiryDateField,
  onSubmitted,
  prepareData,
  roles,
}: Properties) => {
  const { t } = useTranslation("invitations");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-content-center">
      <Button
        label={t("modal.button.label")}
        iconLeft={buttonIcon}
        onClick={() => setModalVisible(true)}
      />
      <Dialog
        className="invitation-modal"
        contentStyle={{ overflowY: "visible" }}
        header={t("modal.dialog.header")}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        draggable={false}
        resizable={false}
      >
        <InvitationForm
          additionalInvitationFields={additionalInvitationFields}
          apps={apps}
          expiryDateField={expiryDateField}
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
          roles={roles}
        />
      </Dialog>
    </div>
  );
};
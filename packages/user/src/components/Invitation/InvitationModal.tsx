import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";
import { Dialog } from "primereact/dialog";
import React, { ComponentType, useState } from "react";

import { InvitationForm } from "./InvitationForm";

import {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  AdditionalInvitationFields,
  InvitationExpiryDateField,
} from "@/types";

interface Properties {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  onSubmitted?: (response: AddInvitationResponse) => void;
  invitationButtonOptions?: ComponentType<typeof Button>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareData?: (data: any) => any;
  roles?: InvitationRoleOption[];
}

export const InvitationModal = ({
  additionalInvitationFields,
  apps,
  expiryDateField,
  onSubmitted,
  invitationButtonOptions,
  prepareData,
  roles,
}: Properties) => {
  const { t } = useTranslation("invitations");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-content-center">
      <Button
        label={t("modal.button.label")}
        onClick={() => setModalVisible(true)}
        {...invitationButtonOptions}
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

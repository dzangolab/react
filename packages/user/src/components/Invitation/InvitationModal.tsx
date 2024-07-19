import { AdditionalFormFields } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Button, IButtonProperties, Modal } from "@dzangolab/react-ui";
import React, { useState } from "react";

import {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
} from "@/types";

import { InvitationForm } from "./InvitationForm";

interface Properties {
  additionalInvitationFields?: AdditionalFormFields;
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  invitationButtonOptions?: IButtonProperties;
  onSubmitted?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareData?: (data: any) => any;
  roles?: InvitationRoleOption[];
}

export const InvitationModal = ({
  additionalInvitationFields,
  apps,
  expiryDateField,
  invitationButtonOptions,
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
        onClick={() => setModalVisible(true)}
        {...invitationButtonOptions}
      />
      <Modal
        className="invitation-modal"
        header={t("modal.dialog.header")}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
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
      </Modal>
    </div>
  );
};

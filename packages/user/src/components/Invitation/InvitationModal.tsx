import { useTranslation } from "@dzangolab/react-i18n";
import { Button, ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconType } from "primereact/utils";
import React, { useEffect, useState } from "react";

import { InvitationForm } from "./InvitationForm";
import client from "../../api/axios";
import { useConfig } from "../../hooks";

import type { App, Role, useFormContext } from "@dzangolab/react-form";

import type { InvitationPayload } from "../../types";

interface Properties {
  handleSubmit: (data: InvitationPayload) => void;
  loading?: boolean;
  buttonIcon?: IconType<ButtonProps>;
  filterRoles?: (apps: App, role: Role[]) => Role[];
  additionalInvitationFields?: {
    fields: React.ComponentType<{
      useFormContext: typeof useFormContext;
    }>;
    additionalInvitationSchema: Zod.ZodObject<any>;
    defaultAdditionalValues: Record<string, any>;
  };
}

export const InvitationModal = ({
  handleSubmit,
  loading,
  buttonIcon,
  filterRoles,
  additionalInvitationFields,
}: Properties) => {
  const { t } = useTranslation("user");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const config = useConfig();

  const [apps, setApps] = useState<App[] | undefined>(undefined);

  useEffect(() => {
    client(config.apiBaseUrl)
      .get<{ apps: App[] }>("/")
      .then((res) => {
        setApps(res.data.apps);
      })
      .catch((error) => console.log(error));
  }, []);

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
          roles={config.user.invitations?.modal.availableRoles || []}
          apps={apps}
          filterRoles={filterRoles}
          additionalInvitationFields={additionalInvitationFields}
        />
      </Dialog>
    </div>
  );
};

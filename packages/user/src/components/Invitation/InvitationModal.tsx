import { useTranslation } from "@dzangolab/react-i18n";
import { Button, ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconType } from "primereact/utils";
import React, { useState } from "react";

import { InvitationForm } from "./InvitationForm";
import client from "../../api/axios";
import { useConfig } from "../../hooks";

import type { InvitationPayload } from "../../types";
import type { App, Role } from "@dzangolab/react-form";

interface Properties {
  handleSubmit: (data: InvitationPayload) => void;
  loading?: boolean;
  buttonIcon?: IconType<ButtonProps>;
  roles: Role[];
}

export const InvitationModal = ({
  handleSubmit,
  loading,
  buttonIcon,
  roles,
}: Properties) => {
  const { t } = useTranslation("user");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const config = useConfig();

  const [apps, setApps] = useState<App[] | undefined>(undefined);

  client(config.apiBaseUrl)
    .get<App[]>("/")
    .then((res) => {
      setApps(res.data);
    })
    .catch((error) => console.log(error));

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
          roles={roles}
          apps={apps}
        />
      </Dialog>
    </div>
  );
};

import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Modal, Data } from "@dzangolab/react-ui";
import React, { useState } from "react";

import { useUser } from "@/hooks";

import { ChangeEmailForm } from "./ChangeEmailForm";

export const ChangeEmailModal = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="change-email-form">
      <Modal
        className="change-email-modal"
        header={t("profile.form.email.title")}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <ChangeEmailForm user={user} />
      </Modal>
      <Data label={t("profile.form.email.label")} value={user?.email} />
      <Button
        label={t("profile.button.update")}
        onClick={() => setModalVisible(true)}
      />
    </div>
  );
};

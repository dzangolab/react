import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Modal, Data } from "@dzangolab/react-ui";
import React, { useState } from "react";

import { useUser } from "@/hooks";

import { EmailUpdateForm } from "./EmailUpdateForm";

export const EmailUpdateModal = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="email-update-form">
      <Modal
        className="update-email-modal"
        header={t("profile.form.email.title")}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <EmailUpdateForm user={user} />
      </Modal>
      <Data label={t("profile.form.email.label")} value={user?.email} />
      <Button
        label={t("profile.button.update")}
        onClick={() => setModalVisible(true)}
      />
    </div>
  );
};

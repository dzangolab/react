import { useTranslation } from "@dzangolab/react-i18n";
import { Modal } from "@dzangolab/react-ui";

import { ChangeEmailForm } from "./ChangeEmailForm";
import { UserType } from "../../types";

interface Properties {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  user: UserType | null;
}

export const ChangeEmailModal = ({
  modalVisible,
  setModalVisible,
  user,
}: Properties) => {
  const { t } = useTranslation("user");

  return (
    <Modal
      className="change-email-modal"
      header={t("profile.form.email.title")}
      visible={modalVisible}
      onHide={() => setModalVisible(false)}
    >
      <ChangeEmailForm user={user} />
    </Modal>
  );
};

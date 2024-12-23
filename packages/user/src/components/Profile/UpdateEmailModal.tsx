import { useTranslation } from "@dzangolab/react-i18n";
import { Modal } from "@dzangolab/react-ui";

import { UpdateEmailForm } from "./UpdateEmailForm";
import { UserType } from "../../types";

interface Properties {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  user: UserType | null;
}

export const UpdateEmailModal = ({
  modalVisible,
  setModalVisible,
  user,
}: Properties) => {
  const { t } = useTranslation("user");
  console.log("test");

  return (
    <Modal
      className="update-email-modal"
      header={t("profile.accountInfo.title")}
      visible={modalVisible}
      onHide={() => setModalVisible(false)}
    >
      <UpdateEmailForm user={user} />
    </Modal>
  );
};

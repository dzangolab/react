import { useTranslation } from "@dzangolab/react-i18n";
import { Modal } from "@dzangolab/react-ui";

import { UpdateEmailForm } from "./UpdateEmailForm";
import { UserType } from "../../types";

interface Properties {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType) => void;
  setIsEmailVerified: (verified: boolean) => void;
}

export const UpdateEmailModal = ({
  modalVisible,
  setModalVisible,
  user,
  setUser,
  setIsEmailVerified,
}: Properties) => {
  const { t } = useTranslation("user");

  return (
    <Modal
      className="update-email-modal"
      header={t("profile.accountInfo.title")}
      visible={modalVisible}
      onHide={() => setModalVisible(false)}
    >
      <UpdateEmailForm
        user={user}
        setModalVisible={setModalVisible}
        setUser={setUser}
        setIsEmailVerified={setIsEmailVerified}
      />
    </Modal>
  );
};

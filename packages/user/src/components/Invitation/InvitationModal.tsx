import { useTranslation } from "@dzangolab/react-i18n";
import { Dialog } from "primereact/dialog";
import { InvitationForm } from "./InvitationForm";
import type { InvitationPayload } from "../../types";

interface Properties {
  handleSubmit: (data: InvitationPayload) => void;
  loading?: boolean;
  visible: boolean;
  setVisible: (data: boolean) => void;
}

export const InvitationModal = ({
  handleSubmit,
  loading,
  visible,
  setVisible,
}: Properties) => {
  const { t } = useTranslation("user");

  return (
    <div className="flex justify-content-center">
      <Dialog
        contentStyle={{ overflowY: "visible" }}
        header={t("invitation.modal.dialog.header")}
        visible={visible}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <InvitationForm
          handleSubmit={handleSubmit}
          onCancel={() => {
            setVisible(false);
          }}
          loading={loading}
        />
      </Dialog>
    </div>
  );
};

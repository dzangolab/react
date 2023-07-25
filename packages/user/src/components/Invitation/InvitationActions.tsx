import { useTranslation } from "@dzangolab/react-i18n";
import { ConfirmationModal } from "@dzangolab/react-ui";
import { ActionsMenu } from "@dzangolab/react-ui";
import { MenuItem } from "primereact/menuitem";
import { useState } from "react";

type InvitationActionsProperites = {
  handleInvitationResend?: (data: any) => void;
  handleInvitationRevoke?: (data: any) => void;
  data: object;
};

export const InvitationActions = ({
  handleInvitationResend,
  handleInvitationRevoke,
  data,
}: InvitationActionsProperites) => {
  const { t } = useTranslation("user");
  const [resendConfirmationDialogVisible, setResendConfirmationDialogVisible] =
    useState(false);
  const [revokeConfirmationDialogVisible, setRevokeConfirmationDialogVisible] =
    useState(false);

  const actionItems: MenuItem[] = [];
  if (handleInvitationResend) {
    actionItems.push({
      label: t("invitation.actions.resend"),
      icon: "pi pi-replay",
      command: (event) => {
        setResendConfirmationDialogVisible(true);
      },
    });
  }

  if (handleInvitationRevoke) {
    actionItems.push({
      label: t("invitation.actions.revoke"),
      icon: "pi pi-times",
      className: "danger",
      command: (event) => {
        setRevokeConfirmationDialogVisible(true);
      },
    });
  }

  return (
    <>
      <ActionsMenu actions={actionItems} />
      <ConfirmationModal
        confirmMessage={t("invitation.resend.confirm.message")}
        data={data}
        handleInvitationResend={handleInvitationResend}
        visible={resendConfirmationDialogVisible}
        onHideConfirmationDialog={() =>
          setResendConfirmationDialogVisible(false)
        }
      />
      <ConfirmationModal
        confirmMessage={t("invitation.revoke.confirm.message")}
        data={data}
        handleInvitationRevoke={handleInvitationRevoke}
        visible={revokeConfirmationDialogVisible}
        onHideConfirmationDialog={() =>
          setRevokeConfirmationDialogVisible(false)
        }
        confirmHeader={t("invitation.confirmation.header")}
      />
    </>
  );
};

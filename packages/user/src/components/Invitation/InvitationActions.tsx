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
  const [resendConfirmationDialog, setResendConfirmationDialog] =
    useState(false);
  const [revokeConfirmationDialog, setRevokeConfirmationDialog] =
    useState(false);

  const actionItems: MenuItem[] = [];
  if (handleInvitationResend) {
    actionItems.push({
      label: t("invitation.actions.resend"),
      icon: "pi pi-replay",
      command: (event) => {
        setResendConfirmationDialog(true);
      },
    });
  }

  if (handleInvitationRevoke) {
    actionItems.push({
      label: t("invitation.actions.revoke"),
      icon: "pi pi-times",
      className: "danger",
      command: (event) => {
        setRevokeConfirmationDialog(true);
      },
    });
  }

  return (
    <>
      <ActionsMenu actions={actionItems} />
      <ConfirmationModal
        message="Are you sure you want to resend?"
        data={data}
        handleInvitationResend={handleInvitationResend}
        visible={resendConfirmationDialog}
        onCancel={() => setResendConfirmationDialog(false)}
      />
      <ConfirmationModal
        message="Are you sure you want to revoke?"
        data={data}
        handleInvitationRevoke={handleInvitationRevoke}
        visible={revokeConfirmationDialog}
        onCancel={() => setRevokeConfirmationDialog(false)}
      />
    </>
  );
};

import { useTranslation } from "@dzangolab/react-i18n";
import { ConfirmationModal, ActionsMenu } from "@dzangolab/react-ui";
import { MenuItem } from "primereact/menuitem";
import { useState } from "react";
import { toast } from "react-toastify";

import { resendInvitation, revokeInvitation } from "@/api/invitation";
import { useConfig } from "@/hooks";
import { Invitation, ResendInvitationResponse } from "@/types";

type InvitationActionsProperites = {
  onInvitationResent?: (response: ResendInvitationResponse) => void;
  onInvitationRevoked?: (response: ResendInvitationResponse) => void;
  invitation: Invitation;
};

export const InvitationActions = ({
  onInvitationResent,
  onInvitationRevoked,
  invitation,
}: InvitationActionsProperites) => {
  const appConfig = useConfig();

  const { t } = useTranslation("invitations");

  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [showRevokeConfirmation, setShowRevokeConfirmation] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [revokeLoading, setRevokeLoading] = useState(false);

  const actionItems: MenuItem[] = [
    {
      label: t("invitations.actions.resend"),
      icon: "pi pi-replay",
      disabled: !!invitation.acceptedAt,
      command: () => {
        setShowResendConfirmation(true);
      },
    },
    {
      label: t("invitations.actions.revoke"),
      icon: "pi pi-times",
      className: "danger",
      disabled: !!invitation.acceptedAt,
      command: () => {
        setShowRevokeConfirmation(true);
      },
    },
  ];

  const onResendConfirm = () => {
    setResendLoading(true);

    resendInvitation(invitation.id, appConfig?.apiBaseUrl || "")
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("messages.resend.error"));
        } else {
          toast.success(t("messages.resend.success"));

          if (onInvitationResent) {
            onInvitationResent(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.resend.error"));
      })
      .finally(() => {
        setResendLoading(false);
      });
  };

  const onRevokeConfirm = () => {
    setResendLoading(true);

    revokeInvitation(invitation.id, appConfig?.apiBaseUrl || "")
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("messages.revoke.error"));
        } else {
          toast.success(t("messages.revoke.success"));

          if (onInvitationRevoked) {
            onInvitationRevoked(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.revoke.error"));
      })
      .finally(() => {
        setRevokeLoading(false);
      });
  };

  return (
    <>
      <ActionsMenu actions={actionItems} />
      <ConfirmationModal
        message={t("confirmation.confirm.resend.message")}
        accept={onResendConfirm}
        reject={() => setShowResendConfirmation(false)}
        visible={showResendConfirmation}
        onHide={() => setShowResendConfirmation(false)}
        header={t("confirmation.header")}
        acceptIcon={resendLoading ? "pi pi-spin pi-spinner" : undefined}
      />
      <ConfirmationModal
        message={t("confirmation.confirm.revoke.message")}
        accept={onRevokeConfirm}
        reject={() => setShowRevokeConfirmation(false)}
        visible={showRevokeConfirmation}
        onHide={() => setShowRevokeConfirmation(false)}
        header={t("confirmation.header")}
        acceptIcon={revokeLoading ? "pi pi-spin pi-spinner" : undefined}
      />
    </>
  );
};

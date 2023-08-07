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

  const { t } = useTranslation("user");

  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [showRevokeConfirmation, setShowRevokeConfirmation] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [revokeLoading, setRevokeLoading] = useState(false);

  const actionItems: MenuItem[] = [
    {
      label: t("invitation.actions.resend"),
      icon: "pi pi-replay",
      command: (event) => {
        setShowResendConfirmation(true);
      },
    },
    {
      label: t("invitation.actions.revoke"),
      icon: "pi pi-times",
      className: "danger",
      command: (event) => {
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
          toast.error(t("invitation.messages.resendError"));
        } else {
          toast.success(t("invitation.messages.resendSuccess"));

          if (onInvitationResent) {
            onInvitationResent(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("invitation.messages.addError"));
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
          toast.error(t("invitation.messages.resendError"));
        } else {
          toast.success(t("invitation.messages.resendSuccess"));

          if (onInvitationRevoked) {
            onInvitationRevoked(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("invitation.messages.addError"));
      })
      .finally(() => {
        setRevokeLoading(false);
      });
  };

  return (
    <>
      <ActionsMenu actions={actionItems} />
      <ConfirmationModal
        message={t("invitation.confirm.resend.message")}
        accept={onResendConfirm}
        visible={showResendConfirmation}
        onHide={() => setShowResendConfirmation(false)}
        header={t("invitation.confirmation.header")}
        acceptIcon={resendLoading ? "pi pi-spin pi-spinner" : undefined}
      />
      <ConfirmationModal
        message={t("invitation.confirm.revoke.message")}
        accept={onRevokeConfirm}
        visible={showRevokeConfirmation}
        onHide={() => setShowRevokeConfirmation(false)}
        header={t("invitation.confirmation.header")}
        acceptIcon={revokeLoading ? "pi pi-spin pi-spinner" : undefined}
      />
    </>
  );
};

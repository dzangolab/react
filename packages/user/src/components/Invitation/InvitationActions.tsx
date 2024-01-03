import { useTranslation } from "@dzangolab/react-i18n";
import { ConfirmationModal, ActionsMenu, Button } from "@dzangolab/react-ui";
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
  let isResend;

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

  const renderDialogFooter = (isResend: boolean) => {
    return (
      <div className="delete-dialog-footer">
        <Button
          label={t("confirmation.confirm.action.reject")}
          variant="outlined"
          severity="secondary"
          onClick={() => handleCancel(isResend)}
        />
        <Button
          label={t("confirmation.confirm.action.accept")}
          iconLeft={
            isResend
              ? resendLoading && "pi pi-spin pi-spinner"
              : revokeLoading && "pi pi-spin pi-spinner"
          }
          onClick={() => {
            if (isResend) {
              onResendConfirm();
              setShowResendConfirmation(false);
            } else {
              onRevokeConfirm();
              setShowRevokeConfirmation(false);
            }
          }}
        />
      </div>
    );
  };

  const handleCancel = (isResend: boolean) => {
    if (isResend) {
      setShowResendConfirmation(false);
    } else {
      setShowRevokeConfirmation(false);
    }
  };

  const renderConfirmationModal = (
    showConfirmation: boolean,
    confirmationMessage: string,
    isResend: boolean,
  ) => {
    return (
      <ConfirmationModal
        onHide={() => handleCancel(isResend)}
        visible={showConfirmation}
        message={confirmationMessage}
        header={t("confirmation.header")}
        footer={renderDialogFooter(isResend)}
      />
    );
  };

  return (
    <>
      <ActionsMenu actions={actionItems} />
      {renderConfirmationModal(
        showResendConfirmation,
        t("confirmation.confirm.resend.message"),
        (isResend = true),
      )}
      {renderConfirmationModal(
        showRevokeConfirmation,
        t("confirmation.confirm.revoke.message"),
        (isResend = false),
      )}
    </>
  );
};

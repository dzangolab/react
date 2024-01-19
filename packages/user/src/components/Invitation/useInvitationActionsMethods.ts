import { resendInvitation, revokeInvitation } from "@/api/invitation";
import { useConfig } from "@/hooks";
import { useTranslation } from "@dzangolab/react-i18n";
import { toast } from "react-toastify";

export const useInvitationActionsMethods = ({
  onInvitationResent,
  onInvitationRevoked,
}: {
  onInvitationResent: any;
  onInvitationRevoked: any;
}) => {
  const appConfig = useConfig();

  const { t } = useTranslation("invitations");

  const onResendConfirm = (invitation: any) => {
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
      });
  };

  const onRevokeConfirm = (invitation: any) => {
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
      });
  };
  return { onResendConfirm, onRevokeConfirm };
};

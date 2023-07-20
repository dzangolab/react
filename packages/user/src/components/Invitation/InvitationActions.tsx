import { MenuItem } from "primereact/menuitem";
import { ActionsMenu } from "@dzangolab/react-ui";
import { useTranslation } from "@dzangolab/react-i18n";

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

  const actionItems: MenuItem[] = [];
  if (handleInvitationResend) {
    actionItems.push({
      label: t("invitation.actions.resend"),
      icon: "pi pi-replay",
      command: (event) => {
        handleInvitationResend(data);
      },
    });
  }

  if (handleInvitationRevoke) {
    actionItems.push({
      label: t("invitation.actions.revoke"),
      icon: "pi pi-times",
      className: "danger",
      command: (event) => {
        handleInvitationRevoke(data);
      },
    });
  }

  return <ActionsMenu actions={actionItems} />;
};

import { MenuItem } from "primereact/menuitem";
import { ActionsMenu } from "@dzangolab/react-ui";

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
  const actionItems: MenuItem[] = [];
  if (handleInvitationResend) {
    actionItems.push({
      label: "Resend",
      icon: "pi pi-replay",
      command: (event) => {
        handleInvitationResend(data);
      },
    });
  }

  if (handleInvitationRevoke) {
    actionItems.push({
      label: "Revoke",
      icon: "pi pi-times",
      className: "danger",
      command: (event) => {
        handleInvitationRevoke(data);
      },
    });
  }

  return <ActionsMenu actions={actionItems} />;
};

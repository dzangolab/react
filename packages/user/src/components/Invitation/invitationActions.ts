import { toast } from "react-toastify";

import { deleteInvitation } from "@/api/invitation";

export const handleDeleteInvitation = (
  apiBaseUrl: string,
  id: string,
  onInvitationDeleted: (response: any) => void,
) => {
  deleteInvitation(apiBaseUrl, id)
    .then((response) => {
      if ("data" in response && response.data.status === "ERROR") {
        // TODO better handle errors
        toast.error("messages.resend.error");
      } else {
        toast.success("messages.resend.success");

        if (onInvitationDeleted) {
          onInvitationDeleted(response);
        }
      }
    })
    .catch(() => {
      toast.error("messages.resend.error");
    });
};

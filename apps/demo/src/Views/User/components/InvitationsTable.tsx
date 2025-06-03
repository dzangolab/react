import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";
import { InvitationsTable } from "@dzangolab/react-user";
import { useNavigate } from "react-router-dom";

import { invitations } from "./data";
import { Section } from "../../../components/Demo";

export const InvitationsTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("invitationsTable.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <InvitationsTable
          invitations={invitations}
          onInvitationAdded={() => {}}
          initialSorting={[{ id: "email", desc: false }]}
          columns={[
            {
              accessorKey: "invitedBy",
              maxWidth: "20rem",
              minWidth: "20rem",
              width: "20rem",
            },
          ]}
          // appFilterOptions={[
          //   { value: 2, label: "2" },
          //   { value: 3, label: "3" },
          //   { value: 1, label: "1" },
          // ]}
          roleFilterOptions={[
            { value: "ADMIN", label: "ADMIN" },
            { value: "SUPERADMIN", label: "SUPERADMIN" },
            { value: "USER", label: "USER" },
          ]}
        />
      </Section>
    </Page>
  );
};

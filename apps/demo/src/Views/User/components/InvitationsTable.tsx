import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { InvitationsTable } from "@dzangolab/react-user";

import { invitations } from "./data";
import { Section } from "../../../components/Demo";

export const InvitationsTableDemo = () => {
  const [t] = useTranslation("user");

  return (
    <Page title={t("invitationsTable.title")}>
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
        />
      </Section>
    </Page>
  );
};

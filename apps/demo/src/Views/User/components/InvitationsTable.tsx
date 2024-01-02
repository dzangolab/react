import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { InvitationsTable } from "@dzangolab/react-user";

import { Section } from "../../../components/Demo";

export const InvitationsTableDemo = () => {
  const [t] = useTranslation("user");

  return (
    <Page title={t("invitationsTable.title")}>
      <Section>
        <InvitationsTable
          invitations={[]}
          fetchInvitations={() => {}}
          onInvitationAdded={() => {}}
        />
      </Section>
    </Page>
  );
};

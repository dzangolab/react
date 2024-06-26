import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { UsersTable } from "@dzangolab/react-user";

import { allUsers } from "./data";
import { Section } from "../../../components/Demo";

export const UsersTableDemo = () => {
  const [t] = useTranslation("user");

  return (
    <Page title={t("usersTable.title")}>
      <Section>
        <UsersTable
          users={allUsers}
          onInvitationAdded={() => {}}
          visibleColumns={[
            "email",
            "name",
            "roles",
            "signedUpAt",
            "status",
            "actions",
          ]}
          columns={[
            {
              accessorKey: "email",
              enableColumnFilter: false,
            },
          ]}
          initialSorting={[{ id: "email", desc: false }]}
        />
      </Section>
    </Page>
  );
};

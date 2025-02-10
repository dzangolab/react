import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";
import { UsersTable } from "@dzangolab/react-user";
import { useNavigate } from "react-router-dom";

import { allUsers } from "./data";
import { Section } from "../../../components/Demo";

export const UsersTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("usersTable.title")}
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

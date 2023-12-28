import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { AllUsersTable } from "@dzangolab/react-user";

import { allUsers } from "./data";
import { Section } from "../../../components/Demo";

export const AllUsersTableDemo = () => {
  const [t] = useTranslation("user");

  return (
    <Page title={t("allUsersTable.title")}>
      <Section>
        <AllUsersTable users={allUsers} />
      </Section>
    </Page>
  );
};

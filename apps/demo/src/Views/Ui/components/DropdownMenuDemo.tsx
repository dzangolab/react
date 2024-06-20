import { useTranslation } from "@dzangolab/react-i18n";
import { DropdownMenuV3, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const DropdownMenuDemo = () => {
  const [t] = useTranslation(["ui", "user"]);

  const userMenu = [
    {
      icon: "pi pi-lock",
      label: t("user:changePassword.title"),
    },
    {
      icon: "pi pi-user",
      label: t("user:userMenu.profile"),
    },
  ];

  return (
    <Page>
      <Section title={t("dropdownMenu.v3")}>
        <DropdownMenuV3 menuItems={userMenu} />
      </Section>
    </Page>
  );
};

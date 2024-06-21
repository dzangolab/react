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
    <Page title={t("dropdownMenu.title")}>
      <Section title={t("dropdownMenu.v3.leftAlign")}>
        <DropdownMenuV3 menuItems={userMenu} />
      </Section>
      <Section title={t("dropdownMenu.v3.rightAlign")}>
        <DropdownMenuV3 popupAlignment="right" menuItems={userMenu} />
      </Section>
    </Page>
  );
};

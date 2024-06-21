import { useTranslation } from "@dzangolab/react-i18n";
import { Button, DropdownMenuV3, Page, Popup } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const DropdownMenuDemo = () => {
  const [t] = useTranslation(["ui", "user"]);

  const menuItems = [
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
        <DropdownMenuV3
          popupOptions={{ position: "left" }}
          menuItems={menuItems}
        />
      </Section>
    </Page>
  );
};

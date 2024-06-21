import { useTranslation } from "@dzangolab/react-i18n";
import { DropdownMenuV3, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const DropdownMenuDemo = () => {
  const [t] = useTranslation(["ui", "user"]);

  const menuItems = [
    {
      icon: "pi pi-lock",
      label: t("user:changePassword.title"),
      className: "change-password",
      display: true,
      disabled: true,
    },
    {
      icon: "pi pi-user",
      label: t("user:userMenu.profile"),
    },
  ];

  const template = (item: any) => {
    return (
      <>
        <i className={item.icon} style={{ marginRight: "0.5rem" }}></i>
        <span>{item.label}</span>
      </>
    );
  };

  return (
    <Page title={t("dropdownMenu.title")}>
      <Section title={t("dropdownMenu.v3.leftAlign")}>
        <DropdownMenuV3
          popupOptions={{ position: "top-start" }}
          menuItems={menuItems}
        />
      </Section>
      <Section title={t("dropdownMenu.v3.templating")}>
        <DropdownMenuV3 menuItems={menuItems} renderOption={template} />
      </Section>
    </Page>
  );
};

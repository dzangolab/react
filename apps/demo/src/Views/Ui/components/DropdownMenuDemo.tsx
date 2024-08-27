import { useTranslation } from "@dzangolab/react-i18n";
import { DropdownMenu, Page } from "@dzangolab/react-ui";

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
      <Section title={t("dropdownMenu.usage.leftAlign")}>
        <DropdownMenu position="top-start" menu={menuItems} />
      </Section>
      <Section title={t("dropdownMenu.usage.templating")}>
        <DropdownMenu menu={menuItems} renderOption={template} />
      </Section>
    </Page>
  );
};

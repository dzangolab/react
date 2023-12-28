import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

export const LayoutPage = () => {
  const [t] = useTranslation("app");

  return (
    <Page title={t("header.menu.layout")}>
      <h3>Installation</h3>
      <br />
      <h3>Usage</h3>
    </Page>
  );
};

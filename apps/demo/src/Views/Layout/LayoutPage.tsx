import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

export const LayoutPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("header.menu.layout")}></Page>;
};

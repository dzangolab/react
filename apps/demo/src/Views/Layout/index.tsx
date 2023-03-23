import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

const Layout = () => {
  const { t } = useTranslation();

  return <Page title={t("header.menu.layout")}></Page>;
};

export default Layout;

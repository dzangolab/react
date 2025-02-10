import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

export const UIPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("pages.ui.title")}></Page>;
};

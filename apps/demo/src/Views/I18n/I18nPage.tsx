import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

export const I18nPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("pages.i18n.title")}></Page>;
};

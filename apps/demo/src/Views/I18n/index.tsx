import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

const I18n = () => {
  const { t } = useTranslation();

  return <Page title={t("header.menu.i18n")}></Page>;
};

export default I18n;

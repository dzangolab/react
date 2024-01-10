import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

export const FormPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("header.menu.form")}></Page>;
};

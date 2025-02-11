import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

export const UserPage = () => {
  const [t] = useTranslation("app");

  return <Page title={t("pages.user.title")}></Page>;
};

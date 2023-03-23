import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

const User = () => {
  const { t } = useTranslation();

  return <Page title={t("header.menu.user")}></Page>;
};

export default User;

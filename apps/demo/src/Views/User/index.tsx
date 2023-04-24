import { useTranslation } from "@dzangolab/react-i18n";
import { Login } from "@dzangolab/react-user";

import ComponentRenderer from "../../components/ComponentRenderer";

const ROUTES = [
  {
    key: 1,
    title: "Login Page",
    component: <Login orientation="horizontal" />,
  },
];

const User = () => {
  const { t } = useTranslation();

  return (
    <ComponentRenderer componentRoutes={ROUTES} title={t("header.menu.user")} />
  );
};

export default User;

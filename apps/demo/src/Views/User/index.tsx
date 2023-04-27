import { useTranslation } from "@dzangolab/react-i18n";
import { Login } from "@dzangolab/react-user";

import ComponentList from "../../components/ComponentList";

const componentList = [
  {
    key: 1,
    title: "Login Page",
    component: <Login orientation="horizontal" />,
  },
];

const User = () => {
  const { t } = useTranslation();

  return (
    <ComponentList
      componentList={componentList}
      title={t("header.menu.user")}
    />
  );
};

export default User;

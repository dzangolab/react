import { useTranslation } from "@dzangolab/react-i18n";
import { UserEnabledHeaderLayout } from "@dzangolab/react-user";
import { Outlet } from "react-router-dom";

import { MENU_ROUTES } from "../constants";

export const BasicLayout = (): JSX.Element => {
  const [t] = useTranslation("app");

  const menu = MENU_ROUTES.map((menuRoute) => ({
    ...menuRoute,
    label: t(menuRoute.key),
  }));

  return (
    <UserEnabledHeaderLayout
      children={<Outlet />}
      navigationMenu={{
        menu: menu,
      }}
    />
  );
};

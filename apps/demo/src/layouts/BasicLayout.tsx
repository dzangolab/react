import { useTranslation } from "@dzangolab/react-i18n";
import { HeaderLayout } from "@dzangolab/react-layout";
import { Outlet } from "react-router-dom";

import { MENU_ROUTES } from "../constants";

export const BasicLayout = (): JSX.Element => {
  const [t] = useTranslation("app");

  const menu = MENU_ROUTES.map((menuRoute) => ({
    ...menuRoute,
    label: t(menuRoute.key),
  }));

  return (
    <HeaderLayout
      children={<Outlet />}
      menu={menu}
      navigationMenu={{
        menu: menu,
      }}
    />
  );
};

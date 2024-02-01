import { useTranslation } from "@dzangolab/react-i18n";
import { SidebarOnlyLayout } from "@dzangolab/react-layout";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";

import config from "../config";

export const SidebarLayout = (): JSX.Element => {
  const { layout: layoutConfig } = config;
  const { t } = useTranslation();

  const navigationMenu = useMemo(() => {
    if (!layoutConfig?.mainMenu) return [];

    return layoutConfig.mainMenu.map((item: any) => ({
      route: item.route,
      label: t(item.name),
      icon: "pi pi-users",
    }));
  }, [layoutConfig?.mainMenu]);

  return (
    <SidebarOnlyLayout
      navigationMenu={navigationMenu}
      displayNavIcons={false}
      bottomNavigationMenu={navigationMenu}
    >
      <Outlet />
    </SidebarOnlyLayout>
  );
};

import { UserMenuModeType } from "@/components/Layout";

import { Header, Layout, NavMenuItemType, NavMenuType, Sidebar } from "..";

interface IProperties {
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
  displayNavIcons?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
  userMenu?: NavMenuItemType;
  userMenuLocation?: "sidebar" | "header";
  userMenuMode?: UserMenuModeType;
  userMenuTrigger?: React.ReactNode;
}

export const SidebarHeaderLayout = ({
  children,
  className,
  collapsible,
  customHeader,
  customSidebar,
  displayNavIcons = true,
  headerAddon,
  navigationMenu,
  noLocaleSwitcher = false,
  noLogo = true,
  noSidebarHeader,
  noSidebarFooter = false,
  noToggle,
  title,
  userMenu,
  userMenuLocation = "header",
  userMenuMode,
  userMenuTrigger,
}: IProperties) => {
  const getNavigationMenu = () => {
    const userNavigationMenu = userMenu
      ? {
          ...userMenu,
          id: "dz-user-menu",
        }
      : undefined;

    if (!userNavigationMenu && !navigationMenu) {
      return;
    }

    if (!navigationMenu) {
      return userNavigationMenu;
    }

    if (!userNavigationMenu) {
      return navigationMenu;
    }

    return Array.isArray(navigationMenu)
      ? [...navigationMenu, userNavigationMenu]
      : [navigationMenu, userNavigationMenu];
  };

  return (
    <Layout className={`dz-sidebar-header-layout ${className || ""}`.trimEnd()}>
      {customHeader || (
        <Header
          displayNavIcons={displayNavIcons}
          headerAddon={headerAddon}
          menu={userMenuLocation !== "sidebar" ? userMenu : undefined}
          noLogo={noLogo}
          noLocaleSwitcher={noLocaleSwitcher}
          noToggle={noToggle}
          title={title}
          userMenuMode={userMenuMode}
        />
      )}
      {customSidebar || (
        <Sidebar
          collapsible={collapsible}
          displayNavIcons={displayNavIcons}
          navigationMenu={getNavigationMenu()}
          noHeader={noSidebarHeader}
          noFooter={noSidebarFooter}
          noLocaleSwitcher={noLocaleSwitcher}
          userMenu={userMenuLocation !== "header" ? userMenu : undefined}
          trigger={userMenuTrigger}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

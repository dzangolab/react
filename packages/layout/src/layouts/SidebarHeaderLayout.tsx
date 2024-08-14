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
  userMenuTrigger,
}: IProperties) => {
  const getNavigationMenu = () => {
    const userNavigationMenu = userMenu;

    if (!userNavigationMenu) {
      return navigationMenu;
    }

    if (!navigationMenu) {
      return userNavigationMenu;
    }

    if (Array.isArray(navigationMenu)) {
      return [...navigationMenu, userNavigationMenu];
    }

    return [navigationMenu, userNavigationMenu];
  };

  return (
    <Layout
      className={`dz-sidebar-header-layout ${className || ""}`.trimEnd()}
      userMenuLocation={userMenuLocation}
    >
      {customHeader || (
        <Header
          displayNavIcons={displayNavIcons}
          headerAddon={headerAddon}
          menu={userMenu}
          noLogo={noLogo}
          noLocaleSwitcher={noLocaleSwitcher}
          noToggle={noToggle}
          title={title}
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
          userMenu={userMenu}
          trigger={userMenuTrigger}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

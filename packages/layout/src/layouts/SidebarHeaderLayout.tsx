import { NavGroupDisplayMode } from "@/components/Layout";
import { Header, Layout, NavMenuItemType, NavMenuType, Sidebar } from "..";

export interface SidebarHeaderLayoutProperties {
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
  userMenuMode?: NavGroupDisplayMode;
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
  userMenuMode,
  userMenuLocation = "header",
  userMenuTrigger,
}: SidebarHeaderLayoutProperties) => {
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
          navigationMenu={navigationMenu}
          noHeader={noSidebarHeader}
          noFooter={noSidebarFooter}
          noLocaleSwitcher={noLocaleSwitcher}
          userMenu={userMenu}
          userMenuMode={userMenuMode}
          trigger={userMenuTrigger}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

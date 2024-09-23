import {
  Layout,
  Sidebar,
  NavMenuType,
  NavMenuItemType,
  NavGroupDisplayMode,
} from "@/components/Layout";

export interface SidebarOnlyLayoutProperties {
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  customSidebar?: React.ReactNode;
  noLocaleSwitcher?: boolean;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
  userMenu?: NavMenuItemType;
  userMenuMode?: NavGroupDisplayMode;
}

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  className,
  children,
  collapsible,
  displayNavIcons,
  navigationMenu,
  customSidebar,
  noLocaleSwitcher,
  noSidebarHeader,
  noSidebarFooter,
  userMenu,
  userMenuMode,
}) => {
  return (
    <Layout className={`dz-sidebar-only-layout ${className || ""}`.trimEnd()}>
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
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

import { Layout, Sidebar, NavMenuType } from "@/components/Layout";

interface SidebarOnlyLayoutProperties {
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  customSidebar?: React.ReactNode;
  noLocaleSwitcher?: boolean;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
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
}) => {
  return (
    <Layout className={`sidebar-only ${className || ""}`.trimEnd()}>
      {customSidebar || (
        <Sidebar
          collapsible={collapsible}
          displayNavIcons={displayNavIcons}
          navigationMenu={navigationMenu}
          noHeader={noSidebarHeader}
          noFooter={noSidebarFooter}
          noLocaleSwitcher={noLocaleSwitcher}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

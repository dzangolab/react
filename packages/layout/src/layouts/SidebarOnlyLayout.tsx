import { Layout, Sidebar, NavMenuType } from "@/components/Layout";

interface SidebarOnlyLayoutProperties {
  children: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  customSidebar?: React.ReactNode;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
}

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  children,
  displayNavIcons,
  navigationMenu,
  customSidebar,
  noSidebarHeader,
  noSidebarFooter,
}) => {
  return (
    <Layout className="sidebar-only">
      {customSidebar || (
        <Sidebar
          displayNavIcons={displayNavIcons}
          navigationMenu={navigationMenu}
          noHeader={noSidebarHeader}
          noFooter={noSidebarFooter}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

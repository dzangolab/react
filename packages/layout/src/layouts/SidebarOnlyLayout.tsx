import { Layout, Sidebar, NavMenuType } from "@/components/Layout";

interface SidebarOnlyLayoutProperties {
  className?: string;
  children: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  customSidebar?: React.ReactNode;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
}

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  className,
  children,
  displayNavIcons,
  navigationMenu,
  customSidebar,
  noSidebarHeader,
  noSidebarFooter,
}) => {
  return (
    <Layout className={`sidebar-only ${className || ""}`.trimEnd()}>
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

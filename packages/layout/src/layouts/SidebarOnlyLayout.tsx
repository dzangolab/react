import { Layout, Sidebar, NavigationType } from "@/components/Layout";

interface SidebarOnlyLayoutProperties {
  children: React.ReactNode;
  displayNavIcons?: boolean;
  navigation?: NavigationType;
  customSidebar?: React.ReactNode;
}

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  children,
  displayNavIcons,
  navigation,
  customSidebar,
}) => {
  return (
    <Layout className="sidebar-only">
      {customSidebar || (
        <Sidebar
          displayNavIcons={displayNavIcons}
          navigation={navigation}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

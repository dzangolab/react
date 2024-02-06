import { Layout, Sidebar, NavigationType } from "@/components/Layout";

type SidebarOnlyLayoutProperties = {
  children: React.ReactNode;
  displayNavIcons?: boolean;
  navigation?: NavigationType;
};

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  children,
  displayNavIcons,
  navigation,
}) => {
  return (
    <Layout className="sidebar-only">
      <Sidebar
        displayNavIcons={displayNavIcons}
        navigation={navigation}
      ></Sidebar>
      <main>{children}</main>
    </Layout>
  );
};

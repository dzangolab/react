import { Layout, Sidebar, NavigationMenuType } from "@/components/Layout";

type SidebarOnlyLayoutProperties = {
  bottomNavigationMenu?: NavigationMenuType;
  children: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu: NavigationMenuType;
};

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  bottomNavigationMenu,
  children,
  displayNavIcons,
  navigationMenu,
}) => {
  return (
    <Layout className="sidebar-only">
      <Sidebar
        displayNavIcons={displayNavIcons}
        navigationMenu={navigationMenu}
        bottomNavigationMenu={bottomNavigationMenu}
      ></Sidebar>
      <main>{children}</main>
    </Layout>
  );
};

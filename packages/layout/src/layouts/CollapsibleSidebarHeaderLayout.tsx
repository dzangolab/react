import { Header, Layout, NavMenuItemType, NavMenuType, Sidebar } from "..";

interface IProperties {
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
  displayLocaleSwitcher?: boolean;
  displayNavIcons?: boolean;
  displaySidebar?: boolean;
  displaySidebarFooter?: boolean;
  localeSwitcher?: boolean;
  navigationMenu?: NavMenuType;
  userMenu?: NavMenuItemType;
}

export const CollapsibleSidebarHeaderLayout = ({
  className,
  children,
  collapsible,
  customHeader,
  customSidebar,
  displayLocaleSwitcher = true,
  displayNavIcons = true,
  displaySidebarFooter = true,
  localeSwitcher,
  navigationMenu,
  userMenu,
}: IProperties) => {
  return (
    <Layout className={`sidebar-header ${className || ""}`.trimEnd()}>
      {customHeader || (
        <Header menu={userMenu} noLogo={true} localeSwitcher={localeSwitcher} />
      )}
      {customSidebar || (
        <Sidebar
          collapsible={collapsible}
          displayNavIcons={displayNavIcons}
          navigationMenu={navigationMenu}
          noFooter={!displaySidebarFooter}
          noLocaleSwitcher={!displayLocaleSwitcher}
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

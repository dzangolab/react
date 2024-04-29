import { Header, Layout, NavMenuItemType, NavMenuType, Sidebar } from "..";

interface IProperties {
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
  displayNavIcons?: boolean;
  localeSwitcher?: React.ReactNode;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
  userMenu?: NavMenuItemType;
}

export const CollapsibleSidebarHeaderLayout = ({
  children,
  className,
  collapsible,
  customHeader,
  customSidebar,
  displayNavIcons = true,
  localeSwitcher,
  navigationMenu,
  noLocaleSwitcher = false,
  noLogo = true,
  noSidebarHeader,
  noSidebarFooter = false,
  noToggle,
  title,
  userMenu,
}: IProperties) => {
  return (
    <Layout className={`sidebar-header ${className || ""}`.trimEnd()}>
      {customHeader || (
        <Header
          displayNavIcons={displayNavIcons}
          localeSwitcher={localeSwitcher}
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
        ></Sidebar>
      )}
      <main>{children}</main>
    </Layout>
  );
};

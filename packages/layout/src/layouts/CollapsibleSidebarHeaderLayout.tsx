import { Layout, NavMenuType, Sidebar } from "..";

interface IProperties {
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
  displayHeader?: boolean;
  displayLocaleSwitcher?: boolean;
  displayNavIcons?: boolean;
  displaySidebar?: boolean;
  displaySidebarFooter?: boolean;
  localeSwitcher?: boolean;
  navigationMenu?: NavMenuType;
  userMenu?: React.ReactNode;
}

const CollapsibleSidebarHeaderLayout = ({
  className,
  children,
  collapsible,
  customHeader,
  customSidebar,
  displayHeader = true,
  displayLocaleSwitcher = false,
  displayNavIcons = true,
  displaySidebar = true,
  displaySidebarFooter = false,
  localeSwitcher,
  navigationMenu,
  userMenu,
}: IProperties) => {
  return (
    <Layout className={`header-sidebar ${className || ""}`.trimEnd()}>
      {displayHeader && (customHeader || <header></header>)}
      {displaySidebar &&
        (customSidebar || (
          <Sidebar
            collapsible={collapsible}
            displayNavIcons={displayNavIcons}
            navigationMenu={navigationMenu}
            noHeader={true}
            noFooter={!displaySidebarFooter}
            noLocaleSwitcher={!displayLocaleSwitcher}
          ></Sidebar>
        ))}
      <main>{children}</main>
    </Layout>
  );
};

export default CollapsibleSidebarHeaderLayout;

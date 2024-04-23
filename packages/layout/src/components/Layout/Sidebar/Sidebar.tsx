import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { NavigationMenu } from "../common";
import { NavMenuType } from "../types";

type SidebarProperties = {
  children?: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noHeader?: boolean;
  noFooter?: boolean;
  noLocaleSwitcher?: boolean;
};

export const Sidebar = ({
  children,
  collapsible = true,
  displayNavIcons = false,
  navigationMenu,
  noHeader = false,
  noFooter = false,
  noLocaleSwitcher = false,
}: SidebarProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        <NavigationMenu
          displayIcons={displayNavIcons}
          navigationMenu={navigationMenu || []}
        />
        {!noFooter && <SidebarFooter noLocaleSwitcher={noLocaleSwitcher} />}
      </>
    );
  };

  return (
    <aside className={!collapsible ? "fixed" : ""}>
      {children || renderContent()}
    </aside>
  );
};

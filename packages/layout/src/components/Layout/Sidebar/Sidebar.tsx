import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { NavigationMenu } from "../common";
import { NavigationMenuType } from "../types";

type SidebarProperties = {
  bottomNavigationMenu?: NavigationMenuType;
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavigationMenuType;
  noHeader?: boolean;
  noFooter?: boolean;
};

export const Sidebar = ({
  bottomNavigationMenu,
  children,
  displayNavIcons = false,
  navigationMenu,
  noHeader = false,
  noFooter = false,
}: SidebarProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        {navigationMenu && (
          <NavigationMenu
            displayIcons={displayNavIcons}
            navigationMenu={navigationMenu}
            primaryNavigation
          />
        )}
        {bottomNavigationMenu && (
          <NavigationMenu
            displayIcons={displayNavIcons}
            navigationMenu={bottomNavigationMenu}
          />
        )}
        {!noFooter && <SidebarFooter />}
      </>
    );
  };

  return <aside>{children || renderContent()}</aside>;
};

import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { NavigationMenu } from "../common";
import { UserMenu } from "../common/UserMenu";

import type { NavMenuItemType, NavMenuType } from "../types";

type SidebarProperties = {
  children?: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noFooter?: boolean;
  noHeader?: boolean;
  noLocaleSwitcher?: boolean;
  userMenu?: NavMenuItemType;
  userMenuLocation?: "sidebar" | "header";
  trigger?: React.ReactNode;
};

export const Sidebar = ({
  children,
  collapsible = true,
  displayNavIcons = false,
  navigationMenu,
  noFooter = false,
  noHeader = false,
  noLocaleSwitcher = false,
  userMenu,
  userMenuLocation,
  trigger,
}: SidebarProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        <NavigationMenu
          displayIcons={displayNavIcons}
          navigationMenu={navigationMenu || []}
        />
        {userMenu && (
          <UserMenu
            menu={userMenu}
            trigger={trigger}
            userMenuLocation={userMenuLocation}
          />
        )}
        {!noFooter && <SidebarFooter noLocaleSwitcher={noLocaleSwitcher} />}
      </>
    );
  };

  return (
    <div className={`dz-sidebar ${!collapsible ? "fixed" : ""}`.trim()}>
      {children || renderContent()}
    </div>
  );
};

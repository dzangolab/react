import { useMemo } from "react";

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
  trigger,
}: SidebarProperties) => {
  const renderContent = () => {
    const defaultTrigger = useMemo(() => {
      return (
        <span className="dz-dropdown-menu-trigger">
          {userMenu?.label || <i className="pi pi-ellipsis-h"></i>}
          <i className="dz-icon pi  pi-ellipsis-v"></i>
        </span>
      );
    }, [userMenu?.label]);

    return (
      <>
        {!noHeader && <SidebarHeader />}
        <NavigationMenu
          displayIcons={displayNavIcons}
          navigationMenu={navigationMenu || []}
        />
        {userMenu && (
          <UserMenu menu={userMenu} trigger={trigger || defaultTrigger} />
        )}
        {!noFooter && <SidebarFooter noLocaleSwitcher={noLocaleSwitcher} />}
      </>
    );
  };

  return (
    <aside className={!collapsible ? "fixed" : undefined}>
      {children || renderContent()}
    </aside>
  );
};

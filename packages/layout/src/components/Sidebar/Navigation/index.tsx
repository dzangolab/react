import {
  NavigationMenu,
  NavigationMenuGroup,
  NavigationMenuItem,
} from "@/types";

import { NavItem } from "./NavItem";

export type SidebarNavigationProperties = {
  displayIcons?: boolean;
  navigationMenu: NavigationMenu;
  primaryNavigation?: boolean;
};

export const SidebarNavigation = ({
  displayIcons = true,
  navigationMenu,
  primaryNavigation = false,
}: SidebarNavigationProperties) => {
  const renderNavGroup = (navGroup: NavigationMenuGroup) => {
    return null;
  };

  const renderNavigation = (nav: NavigationMenuItem | NavigationMenuGroup) => {
    if ("submenu" in nav) {
      return renderNavGroup(nav);
    }

    return <NavItem navItem={nav} displayIcon={displayIcons} />;
  };

  if (primaryNavigation) {
    return (
      <nav className="sidebar-navigation">
        {navigationMenu.length ? (
          <ul>
            {navigationMenu.map((nav, index) => {
              return <li key={index}>{renderNavigation(nav)}</li>;
            })}
          </ul>
        ) : null}
      </nav>
    );
  }

  return (
    <div className="sidebar-navigation">
      {navigationMenu.length ? (
        <ul>
          {navigationMenu.map((nav, index) => {
            return <li key={index}>{renderNavigation(nav)}</li>;
          })}
        </ul>
      ) : null}
    </div>
  );
};

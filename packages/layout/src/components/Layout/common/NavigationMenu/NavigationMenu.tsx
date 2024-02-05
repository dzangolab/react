import { NavItem } from "./NavItem";
import {
  NavigationMenuType,
  NavigationMenuGroup,
  NavigationMenuItem,
} from "../../types";

export type NavigationMenuProperties = {
  displayIcons?: boolean;
  horizontal?: boolean;
  navigationMenu: NavigationMenuType;
  primaryNavigation?: boolean;
};

export const NavigationMenu = ({
  displayIcons = true,
  horizontal = false,
  navigationMenu,
  primaryNavigation = false,
}: NavigationMenuProperties) => {
  const renderNavGroup = (navGroup: NavigationMenuGroup) => {
    return null;
  };

  const renderNavigation = (nav: NavigationMenuItem | NavigationMenuGroup) => {
    if ("submenu" in nav) {
      return renderNavGroup(nav);
    }

    return <NavItem navItem={nav} displayIcon={displayIcons} />;
  };

  const renderContent = () => {
    if (!navigationMenu?.length) {
      return null;
    }

    return (
      <ul>
        {navigationMenu.map((nav, index) => {
          return <li key={index}>{renderNavigation(nav)}</li>;
        })}
      </ul>
    );
  };

  if (primaryNavigation) {
    return (
      <nav className="navigation-menu" data-horizontal={horizontal}>
        {renderContent()}
      </nav>
    );
  }

  return (
    <div className="navigation-menu" data-horizontal={horizontal}>
      {renderContent()}
    </div>
  );
};

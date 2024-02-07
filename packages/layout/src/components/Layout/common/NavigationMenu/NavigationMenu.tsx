import { NavItem } from "./NavItem";
import {
  NavMenuType,
  NavGroupType,
  NavItemType,
  NavMenuItemType,
} from "../../types";

export type NavigationMenuProperties = {
  displayIcons?: boolean;
  horizontal?: boolean;
  navigationMenu: NavMenuType;
};

export const NavigationMenu = ({
  displayIcons = true,
  horizontal = false,
  navigationMenu,
}: NavigationMenuProperties) => {
  const renderNavGroup = (navGroup: NavGroupType) => {
    return null;
  };

  const renderNavigation = (nav: NavItemType | NavGroupType) => {
    if ("submenu" in nav) {
      return renderNavGroup(nav);
    }

    return <NavItem navItem={nav} displayIcon={displayIcons} />;
  };

  const renderNavMenuItem = (
    { label, menu }: NavMenuItemType,
    index?: number,
  ) => {
    return (
      <div className="nav-menu-item" key={index}>
        {label && <span>{label}</span>}
        <ul>
          {menu.map((nav, _index) => {
            return <li key={_index}>{renderNavigation(nav)}</li>;
          })}
        </ul>
      </div>
    );
  };

  const renderNavMenu = () => {
    if (!navigationMenu) return null;

    if (Array.isArray(navigationMenu)) {
      return navigationMenu.map((navMenuItem, index) =>
        renderNavMenuItem(navMenuItem, index),
      );
    }

    return renderNavMenuItem(navigationMenu);
  };

  return (
    <nav className="navigation-menu" data-horizontal={horizontal}>
      {renderNavMenu()}
    </nav>
  );
};

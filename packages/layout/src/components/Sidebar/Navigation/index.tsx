import { NavItem } from "./NavItem";

type NavigationMenuItem = {
  label: string;
  route: string;
  icon?: string;
};

type NavigationMenuGroup = {
  label: string;
  icon: string;
  submenu: NavigationMenuItem[];
};

export type NavigationMenu = Array<NavigationMenuItem | NavigationMenuGroup>;

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
        <ul>
          {navigationMenu.map((nav, index) => {
            return <li key={index}>{renderNavigation(nav)}</li>;
          })}
        </ul>
      </nav>
    );
  }

  return (
    <div className="sidebar-navigation">
      <ul>
        {navigationMenu.map((nav, index) => {
          return <li key={index}>{renderNavigation(nav)}</li>;
        })}
      </ul>
    </div>
  );
};

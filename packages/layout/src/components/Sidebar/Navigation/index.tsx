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

export type SidebarNavigationProps = {
  navigationMenu: NavigationMenu;
  displayIcons?: boolean;
};

export const SidebarNavigation = ({
  navigationMenu,
  displayIcons = true,
}: SidebarNavigationProps) => {
  const renderNavGroup = (navGroup: NavigationMenuGroup) => {
    return null;
  };

  const renderNavigation = (nav: NavigationMenuItem | NavigationMenuGroup) => {
    if ("submenu" in nav) {
      return renderNavGroup(nav);
    }

    return <NavItem navItem={nav} displayIcon={displayIcons} />;
  };

  return (
    <ul className="navigation">
      {navigationMenu.map((nav, index) => {
        return <li key={index}>{renderNavigation(nav)}</li>;
      })}
    </ul>
  );
};

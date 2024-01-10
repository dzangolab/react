import React from "react";

import { MenuItem } from "./Item";

export type MenuRouteType = {
  name: string;
  route: string;
  icon?: React.ReactNode;
};

export type ExtendedMenuRouteType = Omit<MenuRouteType, "route"> & {
  route?: string;
  submenu: Array<MenuRouteType>;
};

export type CombinedMenuRouteType = Array<
  MenuRouteType | ExtendedMenuRouteType
>;

interface Properties {
  className: string;
  orientation?: "horizontal" | "vertical";
  routes: CombinedMenuRouteType;
  displayIcon?: boolean;
}

const ResponsiveMenu = ({
  className,
  displayIcon = false,
  orientation = "horizontal",
  routes,
}: Properties) => {
  let _className = "responsive-menu";

  if (className) {
    _className += " " + className;
  }

  const renderMenu = (routes: CombinedMenuRouteType, displayIcon: boolean) => {
    return routes.map((route) => {
      return <MenuItem route={route} displayIcon={displayIcon} />;
    });
  };

  return (
    <nav className={_className} aria-orientation={orientation}>
      <ul>{renderMenu(routes, displayIcon)}</ul>
    </nav>
  );
};

ResponsiveMenu.defaultProps = {
  className: undefined,
};

export default ResponsiveMenu;

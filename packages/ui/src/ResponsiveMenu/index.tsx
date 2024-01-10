import React from "react";

import { MenuItemGroup } from "./ItemGroup";

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

  return (
    <nav className={_className} aria-orientation={orientation}>
      <ul>
        <MenuItemGroup routes={routes} displayIcon={displayIcon} />
      </ul>
    </nav>
  );
};

ResponsiveMenu.defaultProps = {
  className: undefined,
};

export default ResponsiveMenu;

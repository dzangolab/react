import React, { useCallback } from "react";
import { useInRouterContext } from "react-router-dom";

import { ResponsiveMenuItem } from "./Item";

export type MenuRouteType = {
  name: string;
  route: string;
  icon?: React.ReactNode;
};

export type ExtendedMenuRouteType = Omit<MenuRouteType, "route"> & {
  route?: string;
  submenu?: Array<MenuRouteType>;
};

export type CombinedMenuRouteType =
  | Array<MenuRouteType>
  | Array<ExtendedMenuRouteType>;

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
  const hasRouterContext = useInRouterContext();

  let _className = "responsive-menu";

  if (className) {
    _className += " " + className;
  }

  const getAnchorList = useCallback(() => {
    const checkIsActive = (link: string) => {
      const pathnameArray = window.location.pathname.split("/");
      const isActive =
        window.location.pathname.startsWith(link) ||
        (pathnameArray.length && pathnameArray.includes(link));

      return isActive;
    };

    return routes.map((route) => {
      const isActive = checkIsActive(route.route || "");

      return (
        <li key={route.name}>
          <a
            href={route.route}
            className={isActive ? "active" : undefined}
            aria-current={isActive ? "page" : undefined}
          >
            {displayIcon ? (
              <span role="icon" title={route.name}>
                {route.icon}
              </span>
            ) : null}
            <span role="label">{route.name}</span>
          </a>
        </li>
      );
    });
  }, [routes]);

  const getRouterList = useCallback(
    () =>
      routes.map((route) => (
        <ResponsiveMenuItem
          key={route.name}
          route={route}
          displayIcon={displayIcon}
        />
      )),
    [routes],
  );

  return (
    <nav className={_className} aria-orientation={orientation}>
      <ul>{hasRouterContext ? getRouterList() : getAnchorList()}</ul>
    </nav>
  );
};

ResponsiveMenu.defaultProps = {
  className: undefined,
};

export default ResponsiveMenu;

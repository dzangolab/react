import React, { useCallback, useState } from "react";
import { NavLink, useInRouterContext } from "react-router-dom";

import { SubMenu } from "../SubMenu";

interface Properties {
  className: string;
  orientation?: "horizontal" | "vertical";
  routes: {
    name: string;
    route: string;
    icon?: React.ReactNode;
    submenu?: Array<{
      name: string;
      route: string;
      icon?: React.ReactNode;
    }>;
  }[];
  displayIcon?: boolean;
}

type ImprovedRoutes = {
  name: string;
  route: string;
  icon?: React.ReactNode;
  showSubMenu?: boolean;
  submenu?: Array<{
    name: string;
    route: string;
    icon?: React.ReactNode;
  }>;
}[];

const ResponsiveMenu = ({
  className,
  displayIcon = false,
  orientation = "horizontal",
  routes,
}: Properties) => {
  const hasRouterContext = useInRouterContext();
  const [improvedRoutes, setImprovedRoutes] = useState<ImprovedRoutes>(routes);

  const handleToggleActiveMenu = useCallback((routeName: string) => {
    setImprovedRoutes((previousRoutes) =>
      previousRoutes.map((route) =>
        route.name === routeName
          ? { ...route, showSubMenu: !route.showSubMenu }
          : route,
      ),
    );
  }, []);

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
      const isActive = checkIsActive(route.route);

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
      improvedRoutes.map((route) => (
        <>
          <li
            key={route.name}
            onClick={() => handleToggleActiveMenu(route.name)}
          >
            <NavLink to={route.route} end={route.route === "/"}>
              {displayIcon ? (
                <span role="icon" title={route.name}>
                  {route.icon}
                </span>
              ) : null}
              <span role="label">{route.name}</span>
            </NavLink>
            <ul key={route.name} className="sub-menu">
              {route?.showSubMenu &&
                route?.submenu?.map((menu) => (
                  <SubMenu key={menu.name} route={menu} />
                ))}
            </ul>
          </li>
        </>
      )),
    [improvedRoutes],
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

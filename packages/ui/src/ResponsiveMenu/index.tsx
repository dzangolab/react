import React, { useCallback } from "react";
import { NavLink, useInRouterContext } from "react-router-dom";

interface Properties {
  className: string;
  orientation?: "horizontal" | "vertical";
  routes: {
    name: string;
    route: string;
    icon?: React.ReactNode;
  }[];
}

const ResponsiveMenu = ({
  className,
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

      return isActive ? "page" : undefined;
    };

    return routes.map((route) => (
      <li key={route.name}>
        <a href={route.route} aria-current={checkIsActive(route.route)}>
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
          <span role="label">{route.name}</span>
        </a>
      </li>
    ));
  }, [routes]);

  const getRouterList = useCallback(
    () =>
      routes.map((route) => (
        <li key={route.name}>
          <NavLink to={route.route}>
            <span role="icon" title={route.name}>
              {route.icon}
            </span>
            <span role="label">{route.name}</span>
          </NavLink>
        </li>
      )),
    [routes]
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

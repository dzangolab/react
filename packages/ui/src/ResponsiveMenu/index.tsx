import React from "react";
import { Link, useInRouterContext } from "react-router-dom";

import "./responsive-menu.css";

interface Properties {
  className: string;
  horizontal?: boolean;
  routes: {
    name: string;
    route: string;
  }[];
}

const ResponsiveMenu = ({
  routes,
  className,
  horizontal = false,
}: Properties) => {
  const hasRouterContext = useInRouterContext();

  if (className) {
    className = "menu" + " " + className;
  } else {
    className = "menu";
  }

  if (horizontal) {
    className += " column";
  }

  return (
    <nav className={className}>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            {hasRouterContext ? (
              <Link to={route.route}>{route.name}</Link>
            ) : (
              <a href={route.route}>{route.name}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

ResponsiveMenu.defaultProps = {
  className: undefined,
};

export default ResponsiveMenu;

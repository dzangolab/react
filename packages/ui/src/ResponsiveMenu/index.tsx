import React from "react";
import { Link, useInRouterContext } from "react-router-dom";

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

  let _className = "responsive-menu";

  if (className) {
    _className += " " + className;
  }

  if (horizontal) {
    _className += " column";
  }

  return (
    <div className={_className}>
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
    </div>
  );
};

ResponsiveMenu.defaultProps = {
  className: undefined,
};

export default ResponsiveMenu;

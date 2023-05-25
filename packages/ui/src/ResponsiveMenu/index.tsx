import React, { useCallback, useState } from "react";
import { Link, useInRouterContext } from "react-router-dom";

interface Properties {
  initialActiveRoute?: string;
  className: string;
  horizontal?: boolean;
  routes: {
    name: string;
    route: string;
    icon?: React.ReactNode;
  }[];
}

const ResponsiveMenu = ({
  initialActiveRoute,
  routes,
  className,
  horizontal = false,
}: Properties) => {
  const [activeItem, setActiveItem] = useState<string>(
    initialActiveRoute || routes[0].name
  );
  const hasRouterContext = useInRouterContext();

  let _className = "responsive-menu";

  if (className) {
    _className += " " + className;
  }

  if (horizontal) {
    _className += " column";
  }

  const getItemList = useCallback(() => {
    if (hasRouterContext) {
      return routes.map((route) => (
        <li
          key={route.name}
          onClick={() => setActiveItem(route.name)}
          aria-selected={activeItem === route.name}
        >
          <Link to={route.route}>
            <span role="icon" title={route.name}>
              {route.icon}
            </span>
            <span role="label">{route.name}</span>
          </Link>
        </li>
      ));
    }

    return routes.map((route) => (
      <li
        key={route.name}
        onClick={() => setActiveItem(route.name)}
        aria-selected={activeItem === route.name}
      >
        <a href={route.route}>
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
          <span role="label">{route.name}</span>
        </a>
      </li>
    ));
  }, [activeItem, routes, hasRouterContext]);

  return (
    <div className={_className}>
      <ul>{getItemList()}</ul>
    </div>
  );
};

ResponsiveMenu.defaultProps = {
  className: undefined,
};

export default ResponsiveMenu;

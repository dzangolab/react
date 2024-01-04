import React, { useCallback, useState } from "react";
import { NavLink, useInRouterContext } from "react-router-dom";

interface Properties {
  className: string;
  orientation?: "horizontal" | "vertical";
  routes: {
    name: string;
    route: string;
    icon?: React.ReactNode;
  }[];
  displayIcon?: boolean;
}

const ResponsiveMenu = ({
  className,
  displayIcon = false,
  orientation = "horizontal",
  routes,
}: Properties) => {
  const hasRouterContext = useInRouterContext();

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

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
      routes.map((route) => (
        <>
          <li
            key={route.name}
            onClick={() => setShowSubMenu((previous) => !previous)}
          >
            <NavLink to={route.route} end={route.route === "/"}>
              {displayIcon ? (
                <span role="icon" title={route.name}>
                  {route.icon}
                </span>
              ) : null}
              <span role="label">{route.name}</span>
            </NavLink>
          </li>
          {showSubMenu && (
            <ul key={route.name}>
              <li>invitation</li>
              <li>name of invitee</li>
              <li>invitation</li>
              <li>name of invitee</li>
            </ul>
          )}
        </>
      )),
    [routes, showSubMenu],
  );

  console.log(showSubMenu);

  // console.log(hasRouterContext);
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

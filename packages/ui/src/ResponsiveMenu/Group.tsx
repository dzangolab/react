import { useState } from "react";
import { NavLink, useInRouterContext } from "react-router-dom";

import { Submenu } from "../Submenu";

import { CombinedMenuRouteType, ExtendedMenuRouteType, MenuRouteType } from ".";

interface IProperties {
  route: ExtendedMenuRouteType | MenuRouteType | any;
  displayIcon?: boolean;
  isActive?: boolean;
}

interface IMenuGroupProperties {
  routes: CombinedMenuRouteType;
  displayIcon: boolean;
}

export const MenuGroup: React.FC<IMenuGroupProperties> = ({
  routes,
  displayIcon,
}) => {
  const hasRouterContext = useInRouterContext();

  if (hasRouterContext) {
    return routes.map((route) => (
      <ResponsiveMenuItem
        key={route.name}
        route={route}
        displayIcon={displayIcon}
      />
    ));
  }

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
      <ResponsiveMenuAnchorItem route={route} isActive={isActive || false} />
    );
  });
};

const ResponsiveMenuAnchorItem: React.FC<IProperties> = ({
  route,
  displayIcon,
  isActive,
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <li key={route.name}>
      <a
        href={route.route}
        className={isActive ? "active" : undefined}
        aria-current={isActive ? "page" : undefined}
        onClick={() => route.submenu && setShowSubmenu(!showSubmenu)}
      >
        {displayIcon ? (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        ) : null}
        <span role="label">{route.name}</span>
      </a>
      {route.submenu && <Submenu submenu={route.submenu} key={route.name} />}
    </li>
  );
};

const ResponsiveMenuItem: React.FC<IProperties> = ({ route, displayIcon }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <li key={route.name} aria-expanded={showSubmenu}>
      <NavLink
        to={route.route || ""}
        end={route.route === "/"}
        onClick={() => route.submenu && setShowSubmenu(!showSubmenu)}
      >
        {displayIcon ? (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        ) : null}
        <span role="label">{route.name}</span>
      </NavLink>
      {route.submenu && <Submenu submenu={route.submenu} key={route.name} />}
    </li>
  );
};

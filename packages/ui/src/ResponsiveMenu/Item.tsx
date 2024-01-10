import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { NavLink, useInRouterContext } from "react-router-dom";

import { Submenu } from "../Submenu";

import { ExtendedMenuRouteType, MenuRouteType } from ".";

interface IProperties {
  route: ExtendedMenuRouteType | MenuRouteType | any;
  displayIcon?: boolean;
  isActive?: boolean;
}

interface IItemLinkProperties {
  children: React.ReactNode;
  route: ExtendedMenuRouteType | MenuRouteType | any;
  setShowSubmenu: Dispatch<SetStateAction<boolean>>;
}

export const MenuItem: React.FC<IProperties> = ({ route, displayIcon }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <li key={route.name} aria-expanded={showSubmenu}>
      <MenuItemLink route={route} setShowSubmenu={setShowSubmenu}>
        {displayIcon ? (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        ) : null}
        <span role="label">{route.name}</span>
      </MenuItemLink>
      {route.submenu && <Submenu submenu={route.submenu} key={route.name} />}
    </li>
  );
};

const MenuItemLink = ({
  children,
  route,
  setShowSubmenu,
}: IItemLinkProperties) => {
  const hasRouterContext = useInRouterContext();

  if (hasRouterContext) {
    return (
      <NavLink
        to={route.route || ""}
        end={route.route === "/"}
        onClick={() => route.submenu && setShowSubmenu((previous) => !previous)}
      >
        {children}
      </NavLink>
    );
  }

  const checkIsActive = useCallback(
    (link: string) => {
      {
        const pathnameArray = window.location.pathname.split("/");
        const isActive =
          window.location.pathname.startsWith(link) ||
          (pathnameArray.length && pathnameArray.includes(link));

        return isActive;
      }
    },
    [route],
  );

  const isActive = checkIsActive(route.route || "");

  return (
    <a
      href={route.route}
      className={isActive ? "active" : undefined}
      aria-current={isActive ? "page" : undefined}
      onClick={() => route.submenu && setShowSubmenu((previous) => !previous)}
    >
      {children}
    </a>
  );
};

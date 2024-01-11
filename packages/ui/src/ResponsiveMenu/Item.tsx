import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { NavLink, useInRouterContext } from "react-router-dom";

import { IsNavLinkActive } from "..";
import { Submenu } from "../Submenu";

import { ExtendedMenuRouteType, MenuRouteType } from ".";

interface IProperties {
  route: ExtendedMenuRouteType | MenuRouteType;
  displayIcon?: boolean;
  isActive?: boolean;
}

interface IItemLinkProperties {
  children: React.ReactNode;
  route: ExtendedMenuRouteType | MenuRouteType;
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
      {"submenu" in route && (
        <Submenu submenu={route.submenu} key={route.name} />
      )}
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
        onClick={() =>
          "submenu" in route && setShowSubmenu((previous) => !previous)
        }
      >
        {children}
      </NavLink>
    );
  }

  const isActive = IsNavLinkActive(route.route || "");

  return (
    <a
      href={route.route}
      className={isActive ? "active" : undefined}
      aria-current={isActive ? "page" : undefined}
      onClick={() =>
        "submenu" in route && setShowSubmenu((previous) => !previous)
      }
    >
      {children}
    </a>
  );
};

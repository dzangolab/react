import { Dispatch, SetStateAction } from "react";
import { useInRouterContext, NavLink } from "react-router-dom";

import { MenuRouteType, NestedMenuRouteType } from ".";

interface IItemLinkProperties {
  children: React.ReactNode;
  route: NestedMenuRouteType | MenuRouteType;
  setShowSubmenu: Dispatch<SetStateAction<boolean>>;
}

export const MenuItemLink = ({
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

  const isActive = isNavLinkActive(route.route || "");

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

const isNavLinkActive = (link: string) => {
  {
    const pathnameArray = window.location.pathname.split("/");
    const isActive =
      window.location.pathname.startsWith(link) ||
      (pathnameArray.length && pathnameArray.includes(link));

    return isActive;
  }
};

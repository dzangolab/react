import { NavLink, useInRouterContext } from "react-router-dom";

import { NavItemType } from "../../types";

export type NavItemProperties = {
  displayIcon?: boolean;
  navItem: NavItemType;
};

export const NavItem = ({ navItem, displayIcon = true }: NavItemProperties) => {
  const hasRouterContext = useInRouterContext();

  if ("display" in navItem && !navItem.display) {
    return null;
  }

  if ("onClick" in navItem) {
    return (
      <div className="nav-item" onClick={navItem.onClick}>
        {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
        {navItem.label}
      </div>
    );
  }

  const isNavLinkActive = (link: string) => {
    {
      const pathnameArray = window.location.pathname.split("/");
      const isActive =
        window.location.pathname.startsWith(link) ||
        (pathnameArray.length && pathnameArray.includes(link));

      return isActive;
    }
  };

  if (hasRouterContext) {
    return (
      <NavLink
        to={navItem.route || ""}
        end={navItem.route === "/"}
        className="nav-item"
      >
        {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
        <span>{navItem.label}</span>
      </NavLink>
    );
  }

  const isActive = isNavLinkActive(navItem.route || "");

  return (
    <a
      href={navItem.route}
      className={isActive ? "nav-item active" : "nav-item"}
      aria-current={isActive ? "page" : undefined}
    >
      {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
      {navItem.label}
    </a>
  );
};

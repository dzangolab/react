import { NavLink, useInRouterContext } from "react-router-dom";

import { NavItemType } from "../../types";

export type NavItemProperties = {
  displayIcon?: boolean;
  navItem: NavItemType;
  isGroupHeader?: boolean;
};

export const NavItem = ({
  navItem,
  displayIcon = true,
  isGroupHeader,
}: NavItemProperties) => {
  const hasRouterContext = useInRouterContext();

  if ("display" in navItem && !navItem.display) {
    return null;
  }

  if ("onClick" in navItem) {
    return (
      <div className="dz-nav-item" onClick={navItem.onClick}>
        {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
        <span>{navItem.label}</span>
        {isGroupHeader && (
          <i className="pi pi-angle-right dz-nav-group-toggle" />
        )}
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
        className="dz-nav-item"
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
      className={isActive ? "dz-nav-item active" : "dz-nav-item"}
      aria-current={isActive ? "page" : undefined}
    >
      {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
      {navItem.label}
    </a>
  );
};

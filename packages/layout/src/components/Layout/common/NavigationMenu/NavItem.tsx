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

  const _className = `dz-nav-item ${navItem.className || ""}`.trim();

  if ("display" in navItem && !navItem.display) {
    return null;
  }

  if (navItem.disabled) {
    return (
      <div className={_className} aria-disabled={navItem.disabled}>
        {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
        <span>{navItem.label}</span>
        {isGroupHeader && (
          <i className="pi pi-angle-right dz-nav-group-toggle" />
        )}
      </div>
    );
  }

  if ("onClick" in navItem) {
    return (
      <div className={_className} onClick={navItem.onClick}>
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
        className={_className}
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
      className={isActive ? `${_className} active` : _className}
      aria-current={isActive ? "page" : undefined}
    >
      {displayIcon && navItem.icon && <i className={navItem.icon}></i>}
      {navItem.label}
    </a>
  );
};

import { NavLink, useInRouterContext } from "react-router-dom";

type NavItem = {
  label: string;
  icon?: string;
} & ({ route: string } | { onClick: () => void });

export type NavItemProperties = {
  navItem: NavItem;
  displayIcon?: boolean;
};

export const NavItem = ({ navItem, displayIcon = true }: NavItemProperties) => {
  const hasRouterContext = useInRouterContext();

  if ("onClick" in navItem) {
    return (
      <div className="nav-item">
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
        {navItem.icon && <i className={navItem.icon}></i>}
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
      {navItem.icon && <i className={navItem.icon}></i>}
      {navItem.label}
    </a>
  );
};

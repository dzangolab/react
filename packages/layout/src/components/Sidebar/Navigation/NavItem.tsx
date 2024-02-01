import { NavLink, useInRouterContext } from "react-router-dom";

type NavItem = {
  label: string;
  icon?: string;
} & ({ route: string } | { onClick: () => void });

export type NavItemProps = {
  navItem: NavItem;
  displayIcon?: boolean;
};

export const NavItem = ({ navItem, displayIcon = true }: NavItemProps) => {
  const hasRouterContext = useInRouterContext();

  if ("onClick" in navItem) {
    return (
      <div>
        {displayIcon && navItem.icon && <span className={navItem.icon}></span>}
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
        {navItem.icon && <span className={navItem.icon}></span>}
        {navItem.label}
      </NavLink>
    );
  }

  const isActive = isNavLinkActive(navItem.route || "");

  return (
    <a
      href={navItem.route}
      className={isActive ? "active" : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      {navItem.icon && <span className={navItem.icon}></span>}
      {navItem.label}
    </a>
  );
};

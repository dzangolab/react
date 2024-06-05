import { ReactNode, useMemo } from "react";
import { NavLink } from "react-router-dom";

interface Properties {
  subnav: Array<any>;
  children?: ReactNode;
  navType?: "grouped" | "list";
}

export const Demo: React.FC<Properties> = ({
  subnav,
  children,
  navType = "list",
}) => {
  const subnavigationMenu = useMemo(() => {
    if (navType === "grouped") {
      return subnav.map(({ header, navItems }) => {
        return (
          <div className="nav-menu">
            {header ? <h2>{header}</h2> : <></>}

            <ul>
              {navItems.map((navItem: any) => {
                return (
                  <li key={navItem.route}>
                    <NavLink to={navItem.route} end>
                      {navItem.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      });
    }

    return (
      <ul>
        {subnav.map((nav: any) => {
          return (
            <li key={nav.route}>
              <NavLink to={nav.route} end>
                {nav.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }, [subnav, navType]);

  return (
    <div className="demo">
      <div className="demo-aside">{subnavigationMenu}</div>
      <div className="demo-main">{children}</div>
    </div>
  );
};

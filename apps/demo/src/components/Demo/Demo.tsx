import { ReactNode, useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";

interface Properties {
  subnav: Array<any>;
  children?: ReactNode;
  isGrouped?: boolean;
}

export const Demo: React.FC<Properties> = ({
  subnav,
  children,
  isGrouped = false,
}) => {
  const demoMainReference = useRef<HTMLDivElement | null>(null);

  const handleLinkClick = () => {
    if (demoMainReference.current) {
      demoMainReference.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const subnavigationMenu = useMemo(() => {
    if (isGrouped) {
      return subnav.map(({ header, navItems }, index) => {
        return (
          <div key={index} className="nav-menu">
            {header ? <strong>{header}</strong> : <></>}

            <ul>
              {navItems.map((navItem: any) => {
                return (
                  <li key={navItem.route}>
                    <NavLink to={navItem.route} onClick={handleLinkClick} end>
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
  }, [subnav, isGrouped]);

  return (
    <div className="demo">
      <div className="demo-aside">{subnavigationMenu}</div>
      <div ref={demoMainReference} className="demo-main">
        {children}
      </div>
    </div>
  );
};

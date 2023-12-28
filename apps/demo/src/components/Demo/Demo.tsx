import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Properties {
  subnav: Array<any>;
  children?: ReactNode;
}

export const Demo: React.FC<Properties> = ({ subnav, children }) => {
  return (
    <div className="demo">
      <div className="demo-aside">
        {subnav.map((nav: any) => {
          return (
            <NavLink key={nav.route} to={nav.route} end>
              {nav.label}
            </NavLink>
          );
        })}
      </div>
      <div className="demo-main">{children}</div>
    </div>
  );
};

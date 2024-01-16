import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Properties {
  subnav: Array<any>;
  children?: ReactNode;
}

export const Demo: React.FC<Properties> = ({ subnav, children }) => {
  return (
    <div className="demo">
      <ul className="demo-aside">
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
      <div className="demo-main">{children}</div>
    </div>
  );
};

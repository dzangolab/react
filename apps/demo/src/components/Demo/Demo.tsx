import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Properties {
  sidebarMenu: Array<any>;
  children?: ReactNode;
}

export const Demo: React.FC<Properties> = ({ sidebarMenu, children }) => {
  return (
    <div className="demo">
      <div className="demo-aside">
        {sidebarMenu.map((route: any) => {
          return (
            <NavLink key={route.route} to={route.route} end>
              {route.label}
            </NavLink>
          );
        })}
      </div>
      <div className="demo-main">{children}</div>
    </div>
  );
};

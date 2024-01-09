import { NavLink } from "react-router-dom";

import { MenuRouteType } from "../ResponsiveMenu";

interface ISubMenuProperties {
  submenu?: Array<MenuRouteType>;
  displayIcon?: boolean;
}

export const SubMenu: React.FC<ISubMenuProperties> = ({ submenu }) => {
  return (
    <ul className="sub-menu">
      {submenu?.map((route) => (
        <li key={route.name}>
          <NavLink
            to={route.route}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {route.icon && (
              <span role="icon" title={route.name}>
                {route.icon}
              </span>
            )}
            <span role="label">{route.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

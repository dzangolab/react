import { NavLink } from "react-router-dom";

import { MenuRouteType } from "../ResponsiveMenu";

interface ISubMenuProperties {
  submenu?: Array<MenuRouteType>;
}

export const Submenu: React.FC<ISubMenuProperties> = ({ submenu }) => {
  return (
    <ul className="submenu">
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

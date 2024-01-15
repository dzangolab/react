import { NavLink } from "react-router-dom";

import { MenuRouteType } from "../ResponsiveMenu";

interface ISubmenuProperties {
  submenu?: Array<MenuRouteType>;
}

export const Submenu: React.FC<ISubmenuProperties> = ({ submenu }) => {
  return (
    <ul className="dz-submenu">
      {submenu?.map((route) => (
        <li key={route.name}>
          <NavLink to={route.route}>
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

import { useState } from "react";
import { NavLink } from "react-router-dom";

interface ISubMenuProperties {
  key?: string;
  submenu?: Array<{ name: string; route: string; icon?: React.ReactNode }>;
  displayIcon?: boolean;
}

export const SubMenu: React.FC<ISubMenuProperties> = ({
  key,
  submenu,
  displayIcon = true,
}) => {
  return (
    <ul key={key} className="sub-menu">
      {submenu?.map((route) => (
        <li key={route.name}>
          <NavLink
            to={route.route}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {displayIcon ? (
              <span role="icon" title={route.name}>
                {route.icon}
              </span>
            ) : null}
            <span role="label">{route.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

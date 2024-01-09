import { useState } from "react";
import { NavLink } from "react-router-dom";

import { SubMenu } from "../SubMenu";

import { MenuRouteType } from ".";

interface IProperties {
  route: MenuRouteType;
  displayIcon?: boolean;
}

export const ResponsiveMenuItem: React.FC<IProperties> = ({
  route,
  displayIcon,
}) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <li key={route.name} aria-expanded={showSubMenu}>
      <NavLink
        to={route.route}
        end={route.route === "/"}
        onClick={() => setShowSubMenu(!showSubMenu)}
      >
        {displayIcon ? (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        ) : null}
        <span role="label">{route.name}</span>
      </NavLink>
      <SubMenu submenu={route.submenu} key={route.name} />
    </li>
  );
};

import { useState } from "react";
import { NavLink } from "react-router-dom";

import Submenu from "../Submenu";

import { ExtendedMenuRouteType } from ".";

interface IProperties {
  route: ExtendedMenuRouteType;
  displayIcon?: boolean;
}

export const ResponsiveMenuItem: React.FC<IProperties> = ({
  route,
  displayIcon,
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <li key={route.name} aria-expanded={showSubmenu}>
      <NavLink
        to={route.route || ""}
        end={route.route === "/"}
        onClick={() => setShowSubmenu(!showSubmenu)}
      >
        {displayIcon ? (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        ) : null}
        <span role="label">{route.name}</span>
      </NavLink>
      {route.submenu && <Submenu submenu={route.submenu} key={route.name} />}
    </li>
  );
};

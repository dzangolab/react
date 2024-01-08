import { end } from "@popperjs/core";
import { NavLink } from "react-router-dom";

interface ISubMenuProperties {
  key?: string;
  route: { route: string; name?: string; icon?: string | React.ReactNode };
  displayIcon?: boolean;
}

export const SubMenu: React.FC<ISubMenuProperties> = ({
  route,
  displayIcon = true,
}) => {
  return (
    <li key={route.name}>
      <NavLink
        to={route.route}
        className={({ isActive }) => (isActive ? "active" : "")}
        end
      >
        {displayIcon ? (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        ) : null}
        <span role="label">{route.name}</span>
      </NavLink>
    </li>
  );
};

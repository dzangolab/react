import { NavLink } from "react-router-dom";

interface INavMenuProperties {
  route: {
    name: string;
    route: string;
    icon?: React.ReactNode;
  };
  displayIcon?: boolean;
}

export const NavMenuItem = ({ displayIcon, route }: INavMenuProperties) => {
  return (
    <li>
      <NavLink to={route.route}>
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

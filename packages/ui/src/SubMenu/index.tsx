import { NavLink } from "react-router-dom";

interface ISubMenuProperties {
  key?: string;
  route: { route: string; name?: string; icon?: string | React.ReactNode };
  displayIcon?: boolean;
}

export const SubMenu: React.FC<ISubMenuProperties> = ({
  key,
  route,
  displayIcon = false,
}) => {
  return (
    <ul key={key}>
      <li key={route.name}>
        <NavLink to={route.route} end={route.route === "/"}>
          {displayIcon ? (
            <span role="icon" title={route.name}>
              {route.icon}
            </span>
          ) : null}
          <span role="label">{route.name}</span>
        </NavLink>
      </li>
    </ul>
  );
};

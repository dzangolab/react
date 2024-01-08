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
      <NavLink to="things/131" end={route.route === "/"}>
        {displayIcon ? (
          <span role="icon" title={route.name}>
            <i className="pi pi-times" />
          </span>
        ) : null}
        <span role="label">{route.name}</span>
      </NavLink>
    </li>
  );
};

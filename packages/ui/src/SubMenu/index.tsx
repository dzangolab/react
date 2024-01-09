import { NavLink } from "react-router-dom";

interface ISubMenuProperties {
  submenu?: Array<{ name: string; route: string; icon?: React.ReactNode }>;
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
            <span role="icon" title={route.name}>
              {route.icon}
            </span>
            <span role="label">{route.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

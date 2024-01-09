import { NavLink } from "react-router-dom";

interface ISubMenuProperties {
  key?: string;
  submenu?: Array<{ name: string; route: string; icon?: React.ReactNode }>;
  displayIcon?: boolean;
}

export const SubMenu: React.FC<ISubMenuProperties> = ({ key, submenu }) => {
  return (
    <ul key={key} className="sub-menu">
      {submenu?.map((route) => (
        <li key={route.name}>
          <NavLink
            to={route.route}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span role="icon" title={route.name}>
              {/* <i className="pi pi-home" /> */}
            </span>
            <span role="label">{route.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

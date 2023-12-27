import { NavLink, Outlet } from "react-router-dom";

export const Demo = ({ routes }: { routes: Array<any> }) => {
  return (
    <div className="demo">
      <div className="demo-aside">
        {routes.map((route: any) => {
          return (
            <NavLink
              key={route.route}
              to={route.route}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {route.label}
            </NavLink>
          );
        })}
      </div>
      <div className="demo-main">
        <Outlet />
      </div>
    </div>
  );
};

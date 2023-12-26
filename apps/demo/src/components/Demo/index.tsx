import { Link, Outlet } from "react-router-dom";

export const Demo = ({ routes }: { routes: Array<any> }) => {
  return (
    <div className="demo">
      <div className="demo-aside">
        {routes.map((route: any) => {
          return <Link to={route.route}>{route.label}</Link>;
        })}
      </div>
      <div className="demo-main">
        <Outlet />
      </div>
    </div>
  );
};

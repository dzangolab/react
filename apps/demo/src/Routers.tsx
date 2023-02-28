import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { BasicLayout } from "./layouts/BasicLayout";
import ErrorBoundary from "./Views/ErrorBoundary";
import ListPage from "./Views/ListPage";
import config from "./config";

const routes = () => {
  const childrenRoutes: RouteObject[] = config.layout?.mainMenu
    ? config.layout.mainMenu.map((route) => {
        return {
          path: route.route,
          element: <ListPage pageTitle={route.name} />,
        };
      })
    : [];

  return createBrowserRouter([
    {
      path: "/",
      element: <BasicLayout />,
      errorElement: <ErrorBoundary />,
      children: childrenRoutes,
    },
  ]);
};

const Routers = () => {
  return <RouterProvider router={routes()} />;
};

export default Routers;

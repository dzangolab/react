import { useTranslation } from "@dzangolab/react-i18n";

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { BasicLayout } from "./layouts/BasicLayout";
import ErrorBoundary from "./Views/ErrorBoundary";
import ListPage from "./Views/ListPage";
import config from "./config";

const routes = (childrenRoutes: RouteObject[]) => {
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
  const { t } = useTranslation();

  const childrenRoutes: RouteObject[] = config.layout?.mainMenu
    ? config.layout.mainMenu.map((route) => {
        return {
          path: route.route,
          element: <ListPage pageTitle={t(route.name)} />,
        };
      })
    : [];

  return <RouterProvider router={routes(childrenRoutes)} />;
};

export default Routers;

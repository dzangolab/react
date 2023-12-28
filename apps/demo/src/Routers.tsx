import { createHashRouter, RouterProvider } from "react-router-dom";

import config from "./config";
import { BasicLayout } from "./layouts/BasicLayout";
import ErrorBoundary from "./Views/ErrorBoundary";
import Form from "./Views/Form";
import Home from "./Views/Home";
import I18n from "./Views/I18n";
import Layout from "./Views/Layout";
import { UIPage, UIPages, UIRoutes } from "./Views/Ui";
import { UserPage, UserPages, UserRoutes } from "./Views/User";

const routes = () => {
  return createHashRouter([
    {
      path: "/",
      element: <BasicLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: (
            <Home
              routes={config.layout?.mainMenu ? config.layout.mainMenu : []}
            />
          ),
        },
        {
          path: "/form",
          element: <Form />,
        },
        {
          path: "/i18n",
          element: <I18n />,
        },
        {
          path: "/layout",
          element: <Layout />,
        },
        {
          path: "/ui",
          element: <UIPages />,
          children: [
            {
              index: true,
              element: <UIPage></UIPage>,
            },
            ...UIRoutes,
          ],
        },
        {
          path: "/user",
          element: <UserPages />,
          children: [
            {
              index: true,
              element: <UserPage></UserPage>,
            },
            ...UserRoutes,
          ],
        },
      ],
    },
  ]);
};

const Routers = () => {
  return <RouterProvider router={routes()} />;
};

export default Routers;

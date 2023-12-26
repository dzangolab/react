import { createHashRouter, RouterProvider } from "react-router-dom";

import config from "./config";
import { BasicLayout } from "./layouts/BasicLayout";
import ErrorBoundary from "./Views/ErrorBoundary";
import Form from "./Views/Form";
import Home from "./Views/Home";
import I18n from "./Views/I18n";
import Layout from "./Views/Layout";
import Ui from "./Views/Ui";
import User from "./Views/User";
import { UIPage, UIPages, UIRoutes } from "./Views/UiV2";

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
          element: <Ui />,
        },
        {
          path: "/ui-v2",
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
          element: <User />,
        },
      ],
    },
  ]);
};

const Routers = () => {
  return <RouterProvider router={routes()} />;
};

export default Routers;

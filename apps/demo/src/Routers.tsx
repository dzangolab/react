import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BasicLayout } from "./layouts/BasicLayout";
import Home from "./Views/Home";

const routes = () => {
  // const publicRouteHandler = async () => {
  //   if (user) {
  //     return redirect("/");
  //   }
  // };

  // const authRouteHandler = async () => {
  //   if (!user) {
  //     return redirect("/login");
  //   }
  // };

  return createBrowserRouter([
    {
      path: "/",
      element: <BasicLayout />,
      // errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Home /> },
        // {
        //   path: "/about",
        //   element: <About />,
        // },
        // {
        //   path: "/auth/callback/google",
        //   element: <AuthGoogleCallback />,
        //   loader: publicRouteHandler,
        // },
        // {
        //   path: "/change-password",
        //   element: <ChangePassword />,
        //   loader: authRouteHandler,
        // },
        // {
        //   path: "/forget-password",
        //   element: <ForgetPassword />,
        //   loader: publicRouteHandler,
        // },
        // {
        //   path: "/profile",
        //   element: <Profile />,
        //   loader: authRouteHandler,
        // },
        // {
        //   path: "/reset-password",
        //   element: <ResetPassword />,
        //   loader: publicRouteHandler,
        // },
        // {
        //   path: "/login",
        //   element: <Login />,
        //   loader: publicRouteHandler,
        // },
        // {
        //   path: "/signup",
        //   element: <Signup />,
        //   loader: publicRouteHandler,
        // },
        // {
        //   path: "/things",
        //   element: <Things />,
        //   loader: authRouteHandler,
        // },
      ],
    },
  ]);
};

const Routers = () => {
  return <RouterProvider router={routes()} />;
};

export default Routers;

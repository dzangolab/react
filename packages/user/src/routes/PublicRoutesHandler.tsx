import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useConfig, useUser } from "@/hooks";

export const PublicRoutesHandler: React.FC = () => {
  const { user } = useUser();
  const config = useConfig();
  const location = useLocation();

  const { homeRoute = "/", customPaths } = config;

  if (user) {
    if (location.search?.startsWith("?redirect=")) {
      const searchParameters = new URLSearchParams(location.search);
      const redirectTo = searchParameters.get("redirect");

      if (redirectTo && redirectTo.length) {
        return <Navigate to={redirectTo} />;
      }
    }

    const home = typeof homeRoute === "string" ? homeRoute : homeRoute(user);

    return <Navigate to={home} />;
  }

  return <Outlet />;
};

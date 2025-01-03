import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useUser } from "@/hooks";

export const ProtectedRoutesHandler: React.FC = () => {
  const location = useLocation();
  const config = useConfig();
  const { user } = useUser();

  const { customPaths } = config;

  const loginPath = customPaths?.login || DEFAULT_PATHS.LOGIN;

  if (!user) {
    return (
      <Navigate
        to={`${loginPath}?redirect=${window.encodeURI(
          location.pathname + location.search,
        )}`}
      />
    );
  }

  return <Outlet />;
};

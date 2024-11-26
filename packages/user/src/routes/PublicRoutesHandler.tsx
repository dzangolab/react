import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useConfig, useUser } from "@/hooks";

export const PublicRoutesHandler: React.FC = () => {
  const { user } = useUser();
  const config = useConfig();

  const { homeRoute = "/" } = config;

  if (user) {
    const home = typeof homeRoute === "string" ? homeRoute : homeRoute(user);

    return <Navigate to={home} />;
  }

  return <Outlet />;
};

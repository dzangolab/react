import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useUser } from "@/hooks";

export const ProfileCompletionRoutesHandler = () => {
  const config = useConfig();
  const location = useLocation();
  const { user } = useUser();

  const { customPaths } = config;

  const profilePath = customPaths?.profile || DEFAULT_PATHS.PROFILE;

  if (
    user?.isProfileCompleted === false &&
    ![profilePath].includes(location.pathname)
  ) {
    return <Navigate to={profilePath} />;
  }

  return <Outlet />;
};

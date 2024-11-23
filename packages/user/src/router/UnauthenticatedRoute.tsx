import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@/hooks";
import { UserType } from "@/types";

export const UnauthenticatedRoute: React.FC<{
  layout: React.ReactNode;
  homeRoute?: string | ((user: UserType) => string);
}> = ({ layout, homeRoute = "/" }) => {
  const { user } = useUser();

  if (user) {
    const home = typeof homeRoute === "string" ? homeRoute : homeRoute(user);

    return <Navigate to={home} />;
  }

  return layout;
};

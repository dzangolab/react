import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@/hooks";

export const UnauthenticatedRoute: React.FC<{ layout: React.ReactNode }> = ({
  layout,
}) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" />;
  }

  return layout;
};

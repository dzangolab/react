import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useEmailVerification, useUser } from "@/hooks";
import { HomeRoute } from "@/types";

export const AuthenticatedRoute: React.FC<{
  layout: React.ReactNode;
  homeRoute?: HomeRoute;
}> = ({ layout, homeRoute = "/" }) => {
  const location = useLocation();

  const { user } = useUser();
  const [emailVerificationEnabled, isEmailVerified] = useEmailVerification();

  if (!user) {
    return <Navigate to={`/login?redirect=${window.location.href}`} />;
  }

  const home = typeof homeRoute === "string" ? homeRoute : homeRoute(user);

  if (emailVerificationEnabled) {
    if (
      ["/email-verification-reminder", "/verify-email"].includes(
        location.pathname,
      )
    ) {
      return !isEmailVerified ? layout : <Navigate to={home} />;
    }

    if (!isEmailVerified) {
      return <Navigate to="/email-verification-reminder" />;
    }
  }

  if (user.isProfileCompleted === false) {
    return ["/profile"].includes(location.pathname) ? (
      layout
    ) : (
      <Navigate to="/profile" />
    );
  }

  return layout;
};

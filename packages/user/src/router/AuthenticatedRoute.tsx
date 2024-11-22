import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useEmailVerification, useUser } from "@/hooks";

export const AuthenticatedRoute: React.FC<{ layout: React.ReactNode }> = ({
  layout,
}) => {
  const location = useLocation();

  const { user } = useUser();
  const [emailVerificationEnabled, isEmailVerified] = useEmailVerification();

  if (!user) {
    return <Navigate to={`/login?redirect=${window.location.href}`} />;
  }

  if (emailVerificationEnabled) {
    if (
      ["/email-verification-reminder", "/verify-email"].includes(
        location.pathname,
      )
    ) {
      return !isEmailVerified ? layout : <Navigate to="/" />;
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

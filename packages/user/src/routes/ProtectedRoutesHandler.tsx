import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useConfig, useEmailVerification, useUser } from "@/hooks";

import { DEFAULT_PATHS } from ".";

export const ProtectedRoutesHandler: React.FC = () => {
  const location = useLocation();
  const config = useConfig();
  const { user } = useUser();
  const [emailVerificationEnabled, isEmailVerified] = useEmailVerification();

  const { homeRoute = "/", customPaths } = config;

  const loginPath = customPaths?.login || DEFAULT_PATHS.LOGIN;
  const profilePath = customPaths?.profile || DEFAULT_PATHS.PROFILE;
  const emailVerificationReminderPath =
    customPaths?.emailVerificationReminder ||
    DEFAULT_PATHS.EMAIL_VERIFICATION_REMINDER;
  const emailVerificationVerifyPath =
    customPaths?.emailVerificationVerify ||
    DEFAULT_PATHS.EMAIL_VERIFICATION_VERIFY;

  if (!user) {
    return <Navigate to={`${loginPath}?redirect=${window.location.href}`} />;
  }

  const home = typeof homeRoute === "string" ? homeRoute : homeRoute(user);

  if (emailVerificationEnabled) {
    if (
      [emailVerificationReminderPath, emailVerificationVerifyPath].includes(
        location.pathname,
      )
    ) {
      return !isEmailVerified ? <Outlet /> : <Navigate to={home} />;
    }

    if (!isEmailVerified) {
      return <Navigate to={emailVerificationReminderPath} />;
    }
  }

  if (user.isProfileCompleted === false) {
    return [profilePath].includes(location.pathname) ? (
      <Outlet />
    ) : (
      <Navigate to={profilePath} />
    );
  }

  return <Outlet />;
};

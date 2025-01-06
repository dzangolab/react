import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useEmailVerification, useUser } from "@/hooks";
import { UserType } from "@/types";

export const EmailVerificationRoutesHandler = () => {
  const config = useConfig();
  const location = useLocation();
  const { user } = useUser();
  const [emailVerificationEnabled, isEmailVerified] = useEmailVerification();

  const { homeRoute = "/", customPaths } = config;

  const emailVerificationReminderPath =
    customPaths?.emailVerificationReminder ||
    DEFAULT_PATHS.EMAIL_VERIFICATION_REMINDER;
  const emailVerificationVerifyPath =
    customPaths?.emailVerificationVerify ||
    DEFAULT_PATHS.EMAIL_VERIFICATION_VERIFY;

  const home =
    typeof homeRoute === "string" ? homeRoute : homeRoute(user as UserType);

  if (
    emailVerificationEnabled &&
    !isEmailVerified &&
    ![emailVerificationReminderPath, emailVerificationVerifyPath].includes(
      location.pathname,
    )
  ) {
    return <Navigate to={emailVerificationReminderPath} />;
  }

  if (
    emailVerificationEnabled &&
    isEmailVerified &&
    [emailVerificationReminderPath, emailVerificationVerifyPath].includes(
      location.pathname,
    )
  ) {
    if (
      config.features?.updateEmail &&
      location.pathname === emailVerificationVerifyPath
    ) {
      return <Outlet />;
    }

    return <Navigate to={home} />;
  }

  return <Outlet />;
};

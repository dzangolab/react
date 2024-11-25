import React from "react";

import AuthGoogleCallback from "@/components/AuthGoogleCallback";
import { RouteOverwrites } from "@/types/router";
import { AcceptInvitation } from "@/views/AcceptInvitation";
import { ChangePassword } from "@/views/ChangePassword";
import { EmailVerificationReminder } from "@/views/EmailVerificationReminder";
import { ForgotPassword } from "@/views/ForgotPassword";
import { Login } from "@/views/Login";
import { Profile } from "@/views/Profile";
import { ResetPassword } from "@/views/ResetPassword";
import { Signup } from "@/views/Signup";
import { SignUpFirstUser } from "@/views/SignUpFirstUser";
import { VerifyEmail } from "@/views/VerifyEmail";

export enum DEFAULT_PATHS {
  // unauthenticated routes
  ACCEPT_INVITATION = "/signup/token/:token",
  AUTH_CALLBACK_GOOGLE = "/auth/callback/google",
  FORGOT_PASSWORD = "/forgot-password",
  LOGIN = "/login",
  RESET_PASSWORD = "/reset-password",
  SIGNUP = "/signup",
  SIGNUP_FIRST_USER = "/signup-first-user",

  // authenticated routes
  CHANGE_PASSWORD = "/change-password",
  EMAIL_VERIFICATION_REMINDER = "/email-verification-reminder",
  EMAIL_VERIFICATION_VERIFY = "/verify-email",
  PROFILE = "/profile",
}

export const DEFAULT_ROUTES = {
  LOGIN: {
    path: DEFAULT_PATHS.LOGIN,
    element: <Login />,
  },
  SIGNUP: {
    path: DEFAULT_PATHS.SIGNUP,
    element: <Signup />,
  },
  SIGNUP_FIRST_USER: {
    path: DEFAULT_PATHS.SIGNUP_FIRST_USER,
    element: <SignUpFirstUser />,
  },
  ACCEPT_INVITATION: {
    path: DEFAULT_PATHS.ACCEPT_INVITATION,
    element: <AcceptInvitation />,
  },
  AUTH_CALLBACK_GOOGLE: {
    path: DEFAULT_PATHS.AUTH_CALLBACK_GOOGLE,
    element: <AuthGoogleCallback />,
  },
  FORGOT_PASSWORD: {
    path: DEFAULT_PATHS.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  RESET_PASSWORD: {
    path: DEFAULT_PATHS.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  PROFILE: {
    path: DEFAULT_PATHS.PROFILE,
    element: <Profile />,
  },
  EMAIL_VERIFICATION_REMINDER: {
    path: DEFAULT_PATHS.EMAIL_VERIFICATION_REMINDER,
    element: <EmailVerificationReminder />,
  },
  EMAIL_VERIFICATION_VERIFY: {
    path: DEFAULT_PATHS.EMAIL_VERIFICATION_VERIFY,
    element: <VerifyEmail />,
  },
  CHANGE_PASSWORD: {
    path: DEFAULT_PATHS.CHANGE_PASSWORD,
    element: <ChangePassword />,
  },
};

export function getCustomPaths(routeOverwrites: RouteOverwrites) {
  if (!routeOverwrites) {
    return undefined;
  }

  const customPaths: { [key: string]: string } = {};

  Object.entries(routeOverwrites).forEach(([key, value]) => {
    if (value?.path) {
      customPaths[key] = value.path;
    }
  });

  return customPaths;
}

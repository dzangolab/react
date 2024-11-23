import React from "react";
import { Routes, Route, RouteObject, RouteProps } from "react-router-dom";

import AuthGoogleCallback from "@/components/AuthGoogleCallback";
import { ChangePassword } from "@/views/ChangePassword";
import { EmailVerificationReminder } from "@/views/EmailVerificationReminder";
import { ForgotPassword } from "@/views/ForgotPassword";
import { Login } from "@/views/Login";
import { Profile } from "@/views/Profile";
import { ResetPassword } from "@/views/ResetPassword";
import { Signup } from "@/views/Signup";
import { SignUpFirstUser } from "@/views/SignUpFirstUser";
import { VerifyEmail } from "@/views/VerifyEmail";

import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { PublicRoute } from "./PublicRoute";
import { UnauthenticatedRoute } from "./UnauthenticatedRoute";
import { AppRouterProperties } from "@/types";

const AppRouter: React.FC<AppRouterProperties> = ({
  unauthenticatedRoutes,
  authenticatedRoutes,
  publicRoutes,
  authLayout,
  unauthLayout,
  publicLayout,
  layout,
  homeRoute = "/",
}) => {
  return (
    <Routes>
      <Route
        element={
          <UnauthenticatedRoute
            layout={unauthLayout || layout}
            homeRoute={homeRoute}
          />
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-first-user" element={<SignUpFirstUser />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/callback/google" element={<AuthGoogleCallback />} />
        <Route path="/signup/token/:token" element={<ForgotPassword />} />

        {unauthenticatedRoutes?.length
          ? unauthenticatedRoutes.map((route: RouteProps) => (
              <Route key={route.path} {...route} />
            ))
          : null}
      </Route>

      <Route element={<AuthenticatedRoute layout={authLayout || layout} />}>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/email-verification-reminder"
          element={<EmailVerificationReminder />}
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* <Route path="/profile-completion" element={<Profile />} /> */}
        {authenticatedRoutes?.length
          ? authenticatedRoutes.map((route: RouteProps) => (
              <Route key={route.path} {...route} />
            ))
          : null}
      </Route>

      <Route element={<PublicRoute layout={publicLayout || layout} />}>
        {publicRoutes?.length
          ? publicRoutes.map((route: RouteProps) => (
              <Route key={route.path} {...route} />
            ))
          : null}
      </Route>
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default AppRouter;

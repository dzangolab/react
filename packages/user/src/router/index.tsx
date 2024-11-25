import React from "react";
import { Routes, Route, RouteProps } from "react-router-dom";

import { AppRouterProperties } from "@/types";

import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { PublicRoute } from "./PublicRoute";
import { DEFAULT_ROUTES } from "./router";
import { UnauthenticatedRoute } from "./UnauthenticatedRoute";

const AppRouter: React.FC<AppRouterProperties> = ({
  unauthenticatedRoutes,
  authenticatedRoutes,
  publicRoutes,
  authLayout,
  unauthLayout,
  publicLayout,
  layout,
  routeOverwrites,
  homeRoute = "/",
}) => {
  const {
    // unauthenticated routes
    acceptInvitation,
    authCallbackGoogle,
    forgotPassword,
    login,
    resetPassword,
    signup,
    signupFirstUser,

    // authenticated routes
    changePassword,
    emailVerificationReminder,
    emailVerificationVerify,
    profile,
  } = routeOverwrites || {};

  const renderUnauthenticatedRoutes = () => {
    return (
      <>
        <Route {...{ ...DEFAULT_ROUTES.LOGIN, ...login }} />
        <Route {...{ ...DEFAULT_ROUTES.SIGNUP, ...signup }} />
        <Route
          {...{ ...DEFAULT_ROUTES.SIGNUP_FIRST_USER, ...signupFirstUser }}
        />
        <Route {...{ ...DEFAULT_ROUTES.RESET_PASSWORD, ...resetPassword }} />
        <Route {...{ ...DEFAULT_ROUTES.FORGOT_PASSWORD, ...forgotPassword }} />
        <Route
          {...{ ...DEFAULT_ROUTES.AUTH_CALLBACK_GOOGLE, ...authCallbackGoogle }}
        />
        <Route
          {...{ ...DEFAULT_ROUTES.ACCEPT_INVITATION, ...acceptInvitation }}
        />

        {unauthenticatedRoutes?.length
          ? unauthenticatedRoutes.map((route: RouteProps) => (
              <Route key={route.path} {...route} />
            ))
          : null}
      </>
    );
  };

  const renderAuthenticatedRoutes = () => {
    return (
      <>
        <Route {...{ ...DEFAULT_ROUTES.CHANGE_PASSWORD, ...changePassword }} />
        <Route
          {...{
            ...DEFAULT_ROUTES.EMAIL_VERIFICATION_REMINDER,
            ...emailVerificationReminder,
          }}
        />
        <Route
          {...{
            ...DEFAULT_ROUTES.EMAIL_VERIFICATION_VERIFY,
            ...emailVerificationVerify,
          }}
        />
        <Route {...{ ...DEFAULT_ROUTES.PROFILE, ...profile }} />

        {authenticatedRoutes?.length
          ? authenticatedRoutes.map((route: RouteProps) => (
              <Route key={route.path} {...route} />
            ))
          : null}
      </>
    );
  };

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
        {renderUnauthenticatedRoutes()}
      </Route>

      <Route element={<AuthenticatedRoute layout={authLayout || layout} />}>
        {renderAuthenticatedRoutes()}
      </Route>

      {publicRoutes?.length && (
        <Route element={<PublicRoute layout={publicLayout || layout} />}>
          {publicRoutes.map((route: RouteProps) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
      )}
    </Routes>
  );
};

export default AppRouter;

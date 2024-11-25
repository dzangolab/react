import React from "react";
import { RouteProps } from "react-router-dom";

import { UserType } from "./types";

export type HomeRoute = string | ((user: UserType) => string);

export type RouteOverwrite = {
  path?: string;
  element?: React.ReactNode;
};

export type RouteOverwrites = {
  // unauthenticated routes
  acceptInvitation?: RouteOverwrite;
  authCallbackGoogle?: RouteOverwrite;
  forgotPassword?: RouteOverwrite;
  login?: RouteOverwrite;
  resetPassword?: RouteOverwrite;
  signup?: RouteOverwrite;
  signupFirstUser?: RouteOverwrite;

  // authenticated routes
  changePassword?: RouteOverwrite;
  emailVerificationReminder?: RouteOverwrite;
  emailVerificationVerify?: RouteOverwrite;
  profile?: RouteOverwrite;
};

export type AppRouterProperties = {
  unauthenticatedRoutes?: Array<RouteProps>;
  authenticatedRoutes?: Array<RouteProps>;
  publicRoutes?: Array<RouteProps>;
  routeOverwrites?: RouteOverwrites;
  homeRoute?: HomeRoute;
} & (
  | {
      authLayout: React.ReactNode;
      unauthLayout: React.ReactNode;
      publicLayout: React.ReactNode;
      layout?: React.ReactNode; // We don't need this if all of three above are available. Kept here only to make typescript happy.
    }
  | {
      layout: React.ReactNode;
      authLayout?: React.ReactNode;
      unauthLayout?: React.ReactNode;
      publicLayout?: React.ReactNode;
    }
);

export type UserWrapperProperties = {
  router: AppRouterProperties;
  children: React.ReactNode;
};

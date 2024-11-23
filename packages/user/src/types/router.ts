import { RouteProps } from "react-router-dom";
import { UserType } from "./types";

export interface RouteOverride {
  path?: string;
}

export interface RouteOverrides {
  home?: ((user: UserType) => string) | string;
  login?: RouteOverride;
  signup?: RouteOverride & { disabled?: boolean };
  signupFirstUser?: RouteOverride & { disabled?: boolean };
  forgotPassword?: RouteOverride & { disabled?: boolean };
}

export type HomeRoute = string | ((user: UserType) => string);

export type AppRouterProperties = {
  unauthenticatedRoutes?: Array<RouteProps>;
  authenticatedRoutes?: Array<RouteProps>;
  publicRoutes?: Array<RouteProps>;
  homeRoute?: HomeRoute;
} & (
  | {
      authLayout: React.ReactNode;
      unauthLayout: React.ReactNode;
      publicLayout: React.ReactNode;
      layout?: React.ReactNode; // We don't need this if all of three above are available. Kept here only to fix type errors.
    }
  | {
      layout: React.ReactNode;
      authLayout?: React.ReactNode;
      unauthLayout?: React.ReactNode;
      publicLayout?: React.ReactNode;
    }
);

export type UserWrapperProperties = {
  routeConfig: AppRouterProperties;
  children: React.ReactNode;
};

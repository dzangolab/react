import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter, { AppRouterProperties } from "./router";

export type UserWrapperProperties = {
  routeConfig: AppRouterProperties;
  children: React.ReactNode;
};

export const UserWrapper: React.FC<UserWrapperProperties> = ({
  routeConfig,
  children,
}) => {
  return (
    <React.Suspense>
      <Router>
        <AppRouter {...routeConfig} />
        {children}
      </Router>
    </React.Suspense>
  );
};

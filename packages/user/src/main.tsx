import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./router";
import { UserWrapperProperties } from "./types/router";

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

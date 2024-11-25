import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ConfigProvider from "./context/ConfigProvider";
import UserProvider from "./context/UserProvider";
import AppRouter from "./router";
import { getCustomPaths } from "./router/router";
import superTokens from "./supertokens";
import { UserConfig } from "./types/config";
import { InitAppOptions } from "./types/types";

export const initApp = ({ config, router, app }: InitAppOptions) => {
  const customPaths = router.routeOverwrites
    ? getCustomPaths(router.routeOverwrites)
    : undefined;

  const __config: UserConfig = { ...config, customPaths };

  superTokens(__config);

  return (
    <ConfigProvider config={__config}>
      <UserProvider>
        <React.Suspense>
          <Router>
            <AppRouter {...router} />
            {app}
          </Router>
        </React.Suspense>
      </UserProvider>
    </ConfigProvider>
  );
};

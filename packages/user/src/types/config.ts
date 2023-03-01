import type { RouteOverrides } from "./router";

interface DzangolabReactUserConfig {
  appContext: string;
  redirectTo: {
    appName: string;
    appURL: string;
  };
  routes?: RouteOverrides;
}

export type { DzangolabReactUserConfig };

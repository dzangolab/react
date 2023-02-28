import type { RouteOverrides } from "./router";

interface DzangolabReactUserConfig {
  redirectTo?: {
    appName: string;
    appURL: string;
  };
  routes?: RouteOverrides;
}

export type { DzangolabReactUserConfig };

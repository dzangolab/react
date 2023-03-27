import type { RouteOverrides } from "./router";

interface DzangolabReactUserConfig {
  supportedRoles: string[];
  redirectTo: {
    appName: string;
    appURL: string;
  };
  routes?: RouteOverrides;
  supportedLoginProviders?: string[];
}

export type { DzangolabReactUserConfig };

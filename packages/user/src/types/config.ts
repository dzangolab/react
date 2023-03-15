import type { RouteOverrides } from "./router";

interface DzangolabReactUserConfig {
  appContext: string;
  redirectTo: {
    appName: string;
    appURL: string;
  };
  routes?: RouteOverrides;
  supportedLoginProviders?: string[];
}

export type { DzangolabReactUserConfig };

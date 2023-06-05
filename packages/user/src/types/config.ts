import { ReactNode } from "react";

import type { RouteOverrides } from "./router";

interface DzangolabReactUserConfig {
  supportedRoles: string[];
  redirectTo: {
    appName: string;
    appURL: string;
  };
  routes?: RouteOverrides;
  supportedLoginProviders?: string[];
  termsAndConditions?: {
    display: boolean;
    label: () => ReactNode;
    showCheckbox?: boolean;
  };
}

export type { DzangolabReactUserConfig };

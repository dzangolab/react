import { ReactNode } from "react";

import type { RouteOverrides } from "./router";

interface DzangolabReactUserConfig {
  supportedRoles: string[];
  routes?: RouteOverrides;
  supportedLoginProviders?: string[];
  termsAndConditions?: {
    display: boolean;
    label: () => ReactNode;
    showCheckbox?: boolean;
  };
  invitations?: {
    modal: {
      displayAppField?: boolean;
    };
  };
}

export type { DzangolabReactUserConfig };

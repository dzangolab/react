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
    endpoints: {
      invitations: string;
      singleInvitation: string;
      revokeInvitation: string;
      resendInvitation: string;
    };
  };
}

export type { DzangolabReactUserConfig };

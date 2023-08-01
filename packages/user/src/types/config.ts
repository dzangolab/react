import { ReactNode } from "react";

import type { RouteOverrides } from "./router";
import { Role } from "@dzangolab/react-form";

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
      availableRoles: Role[];
    };
  };
}

export type { DzangolabReactUserConfig };

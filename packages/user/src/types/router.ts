import { ReactNode } from "react";

import { UserType } from "./types";

interface RouteOverride {
  path?: string;
}

interface RouteOverrides {
  home?: ((user: UserType) => string) | string;
  login?: RouteOverride;
  signup?: RouteOverride & {
    disabled?: boolean;
    termsAndCondition?: boolean;
    label?: () => ReactNode;
    checkbox?: boolean;
  };
  forgetPassword?: RouteOverride & { disabled?: boolean };
}

export type { RouteOverride, RouteOverrides };

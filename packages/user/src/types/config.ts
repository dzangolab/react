import { ReactNode } from "react";

import { SocialLoginType } from "@/components/Login";

import type { RouteOverrides } from "./router";

interface DzangolabReactUserConfig {
  supportedRoles: string[];
  routes?: RouteOverrides;
  supportedLoginProviders?: SocialLoginType[];
  termsAndConditions?: {
    display: boolean;
    label: () => ReactNode;
    showCheckbox?: boolean;
  };
  features?: {
    signUp?: {
      emailVerification: boolean;
      profileCompletionRequired: boolean;
    };
  };
}

export type { DzangolabReactUserConfig };

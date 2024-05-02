import { ReactNode } from "react";
import { UserInput } from "supertokens-web-js/recipe/session";

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
      emailVerification?: boolean;
      profileCompletionRequired?: boolean;
    };
  };
  supertokens?: {
    sessionConfig?: UserInput;
  };
}

export type { DzangolabReactUserConfig };

import { ReactNode } from "react";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

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
    sessionConfig?: Session.UserInput;
    thirdPartyEmailPasswordConfig?: ThirdPartyEmailPassword.UserInput;
  };
}

export type { DzangolabReactUserConfig };

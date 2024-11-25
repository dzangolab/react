import { ReactNode } from "react";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { SocialLoginType } from "@/components/Login";

import type { RouteOverwrites } from "./router";

export interface UserConfigOptions {
  apiBaseUrl: string;
  appDomain: string;
  features?: {
    forgotPassword?: boolean;
    signup?:
      | false
      | {
          emailVerification?: boolean;
        };
    signupFirstUser?: boolean;
    termsAndConditions?: {
      display: boolean;
      label: ReactNode;
      showCheckbox?: boolean;
    };
  };
  socialLoginProviders?: SocialLoginType[];
  supertokens: {
    appName: string;
    apiDomain: string;
    apiBasePath?: string;
    sessionConfig?: Session.UserInput;
    thirdPartyEmailPasswordConfig?: ThirdPartyEmailPassword.UserInput;
  };
  supportedRoles: string[];
}

export interface UserConfig extends UserConfigOptions {
  customPaths?: {
    [K in keyof RouteOverwrites]?: string;
  };
}

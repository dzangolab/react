import { ReactNode } from "react";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { SocialLoginType } from "@/components/Login";

import type {
  HomeRoute,
  ProtectedRouteOverwrites,
  PublicRouteOverwrites,
} from "./routes";

export interface UserConfig {
  apiBaseUrl: string;
  appDomain: string;
  customPaths?: {
    [K in keyof (ProtectedRouteOverwrites & PublicRouteOverwrites)]?: string;
  };
  features?: {
    emailVerification?: boolean;
    forgotPassword?: boolean;
    signup?: boolean;
    signupFirstUser?: boolean;
    termsAndConditions?: {
      display: boolean;
      label: ReactNode;
      showCheckbox?: boolean;
    };
  };
  homeRoute?: HomeRoute;
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

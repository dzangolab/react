import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type {
  HomeRoute,
  ProtectedRouteOverwrites,
  PublicRouteOverwrites,
} from "./routes";

import { SocialLoginType } from "@/components/Login";

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
      external?: boolean;
      showCheckbox?: boolean;
      url?: string;
    };
    updateEmail?: boolean;
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

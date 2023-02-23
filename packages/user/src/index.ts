import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import UserMenu from "./components/UserMenu";
import UserProvider, { userContext } from "./context/UserProvider";
import UserEnabledAdminLayout from "./layouts/UserEnabledAdminLayout";
import UserEnabledBasicLayout from "./layouts/UserEnabledBasicLayout";
import superTokens from "./supertokens";
import UserToastContainer from "./toastify";
import { DzangolabReactUserConfig, UserContextType } from "./types";
import ChangePassword from "./views/ChangePassword";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";

declare module "@dzangolab/react-config" {
  export interface AppConfig {
    user?: DzangolabReactUserConfig;
  }
}

export {
  AuthGoogleCallback,
  ChangePassword,
  DropdownUserMenu,
  ForgetPassword,
  Login,
  Profile,
  ResetPassword,
  Signup,
  UserEnabledAdminLayout,
  UserEnabledBasicLayout,
  UserMenu,
  UserProvider,
  UserToastContainer,
  superTokens,
  userContext,
};

export type { UserContextType, EmailPasswordUserType };

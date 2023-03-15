import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import UserMenu from "./components/UserMenu";
import UserProvider, { userContext } from "./context/UserProvider";
import UserEnabledBasicLayout from "./layouts/UserEnabledBasicLayout";
import UserEnabledSidebarLayout from "./layouts/UserEnabledSidebarLayout";
import superTokens from "./supertokens";
import UserToastContainer from "./toastify";
import { DzangolabReactUserConfig, UserContextType } from "./types";
import ChangePassword from "./views/ChangePassword";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import UsersPage from "./views/UsersPage";

declare module "@dzangolab/react-config" {
  export interface AppConfig {
    user: DzangolabReactUserConfig;
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
  UserEnabledSidebarLayout,
  UserEnabledBasicLayout,
  UserMenu,
  UsersPage,
  UserProvider,
  UserToastContainer,
  superTokens,
  userContext,
};

export type { UserContextType, EmailPasswordUserType };

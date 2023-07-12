import AuthGoogleCallback from "./components/AuthGoogleCallback";
import ChangePassword from "./views/ChangePassword";
import DropdownUserMenu from "./components/DropdownUserMenu";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import TermsAndConditions from "./components/TermsAndConditions";
import UserEnabledBasicLayout from "./layouts/UserEnabledBasicLayout";
import UserEnabledSidebarLayout from "./layouts/UserEnabledSidebarLayout";
import UserMenu from "./components/UserMenu";
import UserProvider, { userContext } from "./context/UserProvider";
import UserToastContainer from "./toastify";
import changePassword from "./supertokens/change-password";
import forgetPassword from "./supertokens/forget-password";
import googleLogin from "./supertokens/google-login";
import login from "./supertokens/login";
import logout from "./supertokens/logout";
import resetPassword from "./supertokens/reset-password";
import signup from "./supertokens/signup";
import superTokens from "./supertokens";
import { DzangolabReactUserConfig, UserContextType, UserType } from "./types";
import { UsersTable, UsersTableProperties } from "./components/UsersTable";
import { getUserData, removeUserData, setUserData } from "./helpers";
import { useUser } from "./hooks";
import { verifySessionRoles } from "./supertokens/helpers";

import "./assets/css/index.css";

declare module "@dzangolab/react-config" {
  export interface AppConfig {
    user: DzangolabReactUserConfig;
  }
}

export {
  // components
  AuthGoogleCallback,
  ChangePassword,
  DropdownUserMenu,
  ForgetPassword,
  Login,
  Profile,
  ResetPassword,
  Signup,
  TermsAndConditions,
  UserEnabledBasicLayout,
  UserEnabledSidebarLayout,
  UserMenu,
  UserProvider,
  UserToastContainer,
  UsersTable,

  // utilities
  changePassword,
  forgetPassword,
  getUserData,
  googleLogin,
  login,
  logout,
  removeUserData,
  resetPassword,
  setUserData,
  signup,
  superTokens,
  useUser,
  userContext,
  verifySessionRoles,
};

export type { UserContextType, UserType, UsersTableProperties };

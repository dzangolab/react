import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import TermsAndConditions from "./components/TermsAndConditions";
import UserMenu from "./components/UserMenu";
import { UsersTable, UsersTableProperties } from "./components/UsersTable";
import UserProvider, { userContext } from "./context/UserProvider";
import { getUserData, removeUserData, setUserData } from "./helpers";
import { useUser } from "./hooks";
import UserEnabledBasicLayout from "./layouts/UserEnabledBasicLayout";
import UserEnabledSidebarLayout from "./layouts/UserEnabledSidebarLayout";
import superTokens from "./supertokens";
import changePassword from "./supertokens/change-password";
import forgetPassword from "./supertokens/forget-password";
import googleLogin from "./supertokens/google-login";
import { verifySessionRoles } from "./supertokens/helpers";
import login from "./supertokens/login";
import logout from "./supertokens/logout";
import resetPassword from "./supertokens/reset-password";
import signup from "./supertokens/signup";
import UserToastContainer from "./toastify";
import { DzangolabReactUserConfig, UserContextType, UserType } from "./types";
import ChangePassword from "./views/ChangePassword";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import { InvitationForm , InvitationModal} from "./components/Invitation";

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
  InvitationForm,
  InvitationModal,
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

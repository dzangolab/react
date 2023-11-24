import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import {
  InvitationForm,
  InvitationModal,
  InvitationsTable,
} from "./components/Invitation";
import { BaseLogin } from "./components/Login";
import SignupForm from "./components/SignupForm";
import TermsAndConditions from "./components/TermsAndConditions";
import UserMenu from "./components/UserMenu";
import {
  UsersTable,
  UsersTableProperties,
  AllUsersTable,
} from "./components/UsersTable";
import UserProvider, { userContext } from "./context/UserProvider";
import { getUserData, removeUserData, setUserData } from "./helpers";
import { useUser, useEmailVerification } from "./hooks";
import UserEnabledBasicLayout from "./layouts/UserEnabledBasicLayout";
import UserEnabledSidebarLayout from "./layouts/UserEnabledSidebarLayout";
import { UserEnabledSwitchableLayout } from "./layouts/UserEnabledSwitchableLayout";
import superTokens from "./supertokens";
import changePassword from "./supertokens/change-password";
import forgetPassword from "./supertokens/forget-password";
import googleLogin from "./supertokens/google-login";
import { verifySessionRoles } from "./supertokens/helpers";
import login from "./supertokens/login";
import logout from "./supertokens/logout";
import resetPassword from "./supertokens/reset-password";
import signup from "./supertokens/signup";
import verifyEmail from "./supertokens/verify-email";
import UserToastContainer from "./toastify";
import AcceptInvitation from "./views/AcceptInvitation";
import ChangePassword from "./views/ChangePassword";
import EmailVerificationReminder from "./views/EmailVerificationReminder";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import SignUpFirstUser from "./views/SignUpFirstUser";
import VerifyEmail from "./views/VerifyEmail";

import "./assets/css/index.css";

import type {
  InvitationPayload,
  LoginCredentials,
  DzangolabReactUserConfig,
  UserContextType,
  UserType,
} from "./types";

declare module "@dzangolab/react-config" {
  export interface AppConfig {
    user: DzangolabReactUserConfig;
  }
}

export {
  // components
  AuthGoogleCallback,
  DropdownUserMenu,
  InvitationForm,
  InvitationModal,
  InvitationsTable,
  SignupForm,
  TermsAndConditions,
  UserEnabledBasicLayout,
  UserEnabledSidebarLayout,
  UserEnabledSwitchableLayout,
  UserMenu,
  UserProvider,
  UserToastContainer,
  UsersTable,
  AllUsersTable,
  BaseLogin,

  // views
  AcceptInvitation,
  ChangePassword,
  ForgetPassword,
  Login,
  Profile,
  ResetPassword,
  Signup,
  SignUpFirstUser,
  VerifyEmail,
  EmailVerificationReminder,

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
  useEmailVerification,
  userContext,
  verifySessionRoles,
  verifyEmail,
};

export type {
  UserContextType,
  UserType,
  UsersTableProperties,
  InvitationPayload,
  LoginCredentials,
};

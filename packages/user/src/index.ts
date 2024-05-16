import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import {
  InvitationForm,
  InvitationModal,
  InvitationsTable,
} from "./components/Invitation";
import { LoginForm, LoginWrapper } from "./components/Login";
import SignupForm from "./components/SignupForm";
import { SignupWrapper } from "./components/SignupWrapper";
import TermsAndConditions from "./components/TermsAndConditions";
import UserMenu from "./components/UserMenu";
import {
  AllUsersTable,
  UsersTable,
  UsersTableProperties,
} from "./components/UsersTable";
import UserProvider, { userContext } from "./context/UserProvider";
import { getUserData, removeUserData, setUserData } from "./helpers";
import {
  useUser,
  useEmailVerification,
  useFirstUserSignup,
  useProfileCompletion,
} from "./hooks";
import {
  UserEnabledBasicLayout,
  UserEnabledSidebarHeaderLayout,
  UserEnabledSidebarLayout,
  UserEnabledSidebarOnlyLayout,
} from "./layouts";
import superTokens from "./supertokens";
import changePassword from "./supertokens/change-password";
import { forgotPassword } from "./supertokens/forgot-password";
import googleLogin from "./supertokens/google-login";
import { verifySessionRoles } from "./supertokens/helpers";
import login from "./supertokens/login";
import logout from "./supertokens/logout";
import { resendVerificationEmail } from "./supertokens/resend-email-verification";
import resetPassword from "./supertokens/reset-password";
import { sendPasswordResetLink } from "./supertokens/send-password-reset-link";
import signup from "./supertokens/signup";
import verifyEmail from "./supertokens/verify-email";
import { AcceptInvitation } from "./views/AcceptInvitation";
import { ChangePassword } from "./views/ChangePassword";
import { EmailVerificationReminder } from "./views/EmailVerificationReminder";
import { ForgotPassword } from "./views/ForgotPassword";
import { Login } from "./views/Login";
import { Profile } from "./views/Profile";
import { ResetPassword } from "./views/ResetPassword";
import { Signup } from "./views/Signup";
import { SignUpFirstUser } from "./views/SignUpFirstUser";
import { VerifyEmail } from "./views/VerifyEmail";

import "./assets/css/index.css";

import type {
  DzangolabReactUserConfig,
  Invitation,
  InvitationAppOption,
  InvitationPayload,
  LoginCredentials,
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
  AllUsersTable,
  AuthGoogleCallback,
  DropdownUserMenu,
  InvitationForm,
  InvitationModal,
  InvitationsTable,
  LoginForm,
  LoginWrapper,
  SignupForm,
  SignupWrapper,
  TermsAndConditions,
  UserMenu,
  UserProvider,
  UsersTable,

  // layouts
  UserEnabledBasicLayout,
  UserEnabledSidebarHeaderLayout,
  UserEnabledSidebarLayout,
  UserEnabledSidebarOnlyLayout,

  // views
  AcceptInvitation,
  ChangePassword,
  EmailVerificationReminder,
  ForgotPassword,
  Login,
  Profile,
  ResetPassword,
  SignUpFirstUser,
  Signup,
  VerifyEmail,

  // utilities
  changePassword,
  forgotPassword,
  getUserData,
  googleLogin,
  login,
  logout,
  removeUserData,
  resetPassword,
  resendVerificationEmail,
  sendPasswordResetLink,
  setUserData,
  signup,
  superTokens,
  useEmailVerification,
  useFirstUserSignup,
  useProfileCompletion,
  useUser,
  userContext,
  verifyEmail,
  verifySessionRoles,
};

export type {
  Invitation,
  InvitationAppOption,
  InvitationPayload,
  LoginCredentials,
  UserContextType,
  UserType,
  UsersTableProperties,
};

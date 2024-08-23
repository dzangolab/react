import { sendPasswordResetEmail } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { disableUser, enableUser } from "./api/user";
import AuthGoogleCallback from "./components/AuthGoogleCallback";
import {
  InvitationForm,
  InvitationModal,
  InvitationsTable,
} from "./components/Invitation";
import { LoginForm, LoginWrapper } from "./components/Login";
import SignupForm from "./components/SignupForm";
import { SignupWrapper } from "./components/SignupWrapper";
import TermsAndConditions from "./components/TermsAndConditions";
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
  UserEnabledHeaderLayout,
  UserEnabledSidebarHeaderLayout,
  UserEnabledSidebarOnlyLayout,
} from "./layouts";
import superTokens from "./supertokens";
import changePassword from "./supertokens/change-password";
import { forgotPassword } from "./supertokens/forgot-password";
import googleLogin from "./supertokens/google-login";
import { verifySessionRoles, isProfileCompleted } from "./supertokens/helpers";
import login from "./supertokens/login";
import logout from "./supertokens/logout";
import ProfileValidationClaim from "./supertokens/profileValidationClaim";
import { resendVerificationEmail } from "./supertokens/resend-email-verification";
import resetPassword from "./supertokens/reset-password";
import signup from "./supertokens/signup";
import verifyEmail from "./supertokens/verify-email";
import { AcceptInvitation } from "./views/AcceptInvitation";
import { ChangePassword } from "./views/ChangePassword";
import { EmailVerificationReminder } from "./views/EmailVerificationReminder";
import { ForgotPassword } from "./views/ForgotPassword";
import { Login } from "./views/Login";
import { Profile } from "./views/Profile";
import ProfileCompletionReminder from "./views/ProfileCompletionReminder";
import { ResetPassword } from "./views/ResetPassword";
import { Signup } from "./views/Signup";
import { SignUpFirstUser } from "./views/SignUpFirstUser";
import { VerifyEmail } from "./views/VerifyEmail";

import "./assets/css/index.css";

import type {
  AcceptInvitationResponse,
  DzangolabReactUserConfig,
  Invitation,
  InvitationAppOption,
  InvitationPayload,
  InvitationRoleOption,
  LoginCredentials,
  ResendInvitationResponse,
  RevokeInvitationResponse,
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
  InvitationForm,
  InvitationModal,
  InvitationsTable,
  LoginForm,
  LoginWrapper,
  ProfileValidationClaim,
  SignupForm,
  SignupWrapper,
  TermsAndConditions,
  UserProvider,
  UsersTable,

  // layouts
  UserEnabledHeaderLayout,
  UserEnabledSidebarHeaderLayout,
  UserEnabledSidebarOnlyLayout,

  // views
  AcceptInvitation,
  ChangePassword,
  EmailVerificationReminder,
  ForgotPassword,
  Login,
  Profile,
  ProfileCompletionReminder,
  ResetPassword,
  SignUpFirstUser,
  Signup,
  VerifyEmail,

  // utilities
  changePassword,
  disableUser,
  enableUser,
  forgotPassword,
  getUserData,
  googleLogin,
  login,
  logout,
  removeUserData,
  resetPassword,
  resendVerificationEmail,
  sendPasswordResetEmail,
  setUserData,
  signup,
  superTokens,
  useEmailVerification,
  useFirstUserSignup,
  isProfileCompleted,
  useProfileCompletion,
  useUser,
  userContext,
  verifyEmail,
  verifySessionRoles,
};

export type {
  AcceptInvitationResponse,
  Invitation,
  InvitationAppOption,
  InvitationPayload,
  InvitationRoleOption,
  LoginCredentials,
  ResendInvitationResponse,
  RevokeInvitationResponse,
  UserContextType,
  UserType,
  UsersTableProperties,
};

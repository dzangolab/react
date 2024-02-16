import { sendPasswordResetEmail } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { disableUser, enableUser } from "./api/user";
import {
  acceptInvitation,
  addInvitation,
  getInvitationByToken,
  resendInvitation,
  revokeInvitation,
} from "./api/invitation";
import {
  changePassword,
  getIsFirstUser,
  signUpFirstUser,
  updateUserProfile,
} from "./api/user";
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
  useAcceptInvitation,
  useChangePassword,
  useEmailVerification,
  useFirstUserSignup,
  useLogin,
  useProfileCompletion,
  useUser,
} from "./hooks";
import {
  UserEnabledBasicLayout,
  UserEnabledHeaderLayout,
  UserEnabledSidebarHeaderLayout,
  UserEnabledSidebarLayout,
  UserEnabledSidebarOnlyLayout,
} from "./layouts";
import superTokens from "./supertokens";
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
  ProfileValidationClaim,
  SignupForm,
  SignupWrapper,
  TermsAndConditions,
  UserMenu,
  UsersTable,

  // context
  userContext,
  UserProvider,

  // layouts
  UserEnabledBasicLayout,
  UserEnabledHeaderLayout,
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
  ProfileCompletionReminder,
  ResetPassword,
  SignUpFirstUser,
  Signup,
  VerifyEmail,

  // utilities
  // supertoken utilities
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
  isProfileCompleted,
  useProfileCompletion,
  verifyEmail,
  verifySessionRoles,

  // hooks
  useAcceptInvitation,
  useChangePassword,
  useEmailVerification,
  useFirstUserSignup,
  useLogin,
  useUser,

  // apis
  changePassword,
  disableUser,
  enableUser,
  getIsFirstUser,
  signUpFirstUser,
  updateUserProfile,
  acceptInvitation,
  addInvitation,
  getInvitationByToken,
  resendInvitation,
  revokeInvitation,
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

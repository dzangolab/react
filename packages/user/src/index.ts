import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import UserMenu from "./components/UserMenu";
import UserProvider, { userContext } from "./context/UserProvider";
import superTokens from "./supertokens";
import UserToastContainer from "./toastify";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";

import type { UserContextType } from "./types";
import type { UserType } from "supertokens-web-js/recipe/emailpassword";

export {
  AuthGoogleCallback,
  DropdownUserMenu,
  ForgetPassword,
  Login,
  ResetPassword,
  Profile,
  Signup,
  superTokens,
  userContext,
  UserMenu,
  UserProvider,
  UserToastContainer,
};

export type { UserContextType, UserType };

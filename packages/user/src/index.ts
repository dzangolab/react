import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import UserMenu from "./components/UserMenu";
import UserProvider, { userContext } from "./context/UserProvider";
import authReducer, { getUser } from "@/redux/reducer/authslice";
import superTokens from "./supertokens";
import UserToastContainer from "./toastify";
import { UserContextType } from "./types";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";

export {
  AuthGoogleCallback,
  authReducer,
  DropdownUserMenu,
  ForgetPassword,
  getUser,
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

export type { UserContextType, EmailPasswordUserType };

import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import AuthGoogleCallback from "./components/AuthGoogleCallback";
import DropdownUserMenu from "./components/DropdownUserMenu";
import UserMenu from "./components/UserMenu";
import UserProvider, { userContext } from "./context/UserProvider";
import AuthProvider from "./redux/AuthProvider";
import { useUserAppDispatch, useUserAppSelector } from "./redux/hooks";
import { getUser } from "./redux/reducer/AuthSlice";
import superTokens from "./supertokens";
import UserToastContainer from "./toastify";
import { UserContextType } from "./types";
import ForgetPassword from "./views/ForgetPassword";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";

export {
  AuthProvider,
  AuthGoogleCallback,
  DropdownUserMenu,
  ForgetPassword,
  getUser,
  Login,
  ResetPassword,
  Profile,
  Signup,
  superTokens,
  userContext,
  useUserAppDispatch,
  useUserAppSelector,
  UserMenu,
  UserProvider,
  UserToastContainer,
};

export type { UserContextType, EmailPasswordUserType };

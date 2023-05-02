import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

interface UserType extends EmailPasswordUserType {
  givenName: string | null;
  lastLoginAt: number;
  middleNames: string | null;
  roles: string[];
  signedUpAt: number;
  surname: string | null;
}

interface UserMenuItemType {
  name: string;
  onClick?: () => void;
  route?: string;
}

interface UserContextType {
  loading: boolean;
  setUser: (user: UserType | undefined) => void;
  user: UserType | undefined;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  error: string | null;
  loading: boolean;
  user: UserType | undefined;
}

interface SignInUpPromise {
  user: UserType;
  status: string;
}

export type {
  AuthState,
  LoginCredentials,
  SignInUpPromise,
  UserContextType,
  UserMenuItemType,
  UserType,
};

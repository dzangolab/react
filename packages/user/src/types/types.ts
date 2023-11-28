import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export interface UserType extends EmailPasswordUserType {
  disabled?: boolean;
  givenName: string | null;
  isEmailVerified?: boolean;
  lastLoginAt: number;
  middleNames: string | null;
  roles: string[];
  signedUpAt: number;
  surname: string | null;
}

export interface UserMenuItemType {
  icon?: string;
  name: string;
  onClick?: () => void;
  route?: string;
}

export interface UserContextType {
  loading: boolean;
  setUser: (user: UserType | undefined) => void;
  user: UserType | undefined;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  error: string | null;
  loading: boolean;
  user: UserType | undefined;
}

export interface SignInUpPromise {
  user: UserType;
  status: string;
}

export interface ErrorResponse {
  data: { message: string; status: "ERROR" };
}
export interface ExtendedUser extends UserType {
  appId?: number;
  isActiveUser: boolean;
  invitedBy: UserType & { isActiveUser: boolean };
}

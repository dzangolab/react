import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export interface UserType extends EmailPasswordUserType {
  givenName: string | null;
  lastLoginAt: number;
  middleNames: string | null;
  roles: string[];
  signedUpAt: number;
  surname: string | null;
}

export interface UserMenuItemType {
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

export interface InvitationPayload {
  email: string;
  role: string;
  appId: number;
}

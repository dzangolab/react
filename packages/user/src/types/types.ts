import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import {
  AdditionalInvitationFields,
  RenderAdditionalInvitationFields,
} from "./invitation";

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
  user: UserType | null;
  setUser: (user: UserType | null) => void;
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

export type UpdateProfileInputType = {
  email: string;
  givenName: string;
  surname: string;
};

export type AdditionalProfileFields = AdditionalInvitationFields;
export type RenderAdditionalProfileFields = RenderAdditionalInvitationFields;

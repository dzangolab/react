import type { UserType } from "supertokens-web-js/recipe/emailpassword";

export interface UserContextType {
  user: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

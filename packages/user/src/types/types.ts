import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

interface UserType extends EmailPasswordUserType {
  profile: Profile | null;
  role: string[];
}

interface Profile {
  givenName: string;
  id: string;
  middleNames: string | null;
  surname: string;
}

interface UserContextType {
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
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

export type { AuthState, UserContextType, LoginCredentials, UserType };

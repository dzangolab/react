import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export interface UserContextType {
  user: EmailPasswordUserType | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<EmailPasswordUserType | undefined>
  >;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

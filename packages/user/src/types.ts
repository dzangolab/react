import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

interface UserContextType {
  user: EmailPasswordUserType | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<EmailPasswordUserType | undefined>
  >;
  loading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export type { UserContextType, LoginCredentials };

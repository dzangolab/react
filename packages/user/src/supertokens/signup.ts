import { emailPasswordSignUp as register } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { LoginCredentials, SignInUpPromise, UserType } from "../types";

const signup = async (
  credentials: LoginCredentials
): Promise<SignInUpPromise | undefined> => {
  let user: UserType;
  let status: string;

  const data = {
    formFields: [
      {
        id: "email",
        value: credentials.email,
      },
      {
        id: "password",
        value: credentials.password,
      },
    ],
  };

  const response = await register(data);

  if (response.status !== "FIELD_ERROR") {
    user = response.user as UserType;
    status = response.status;
  } else throw new Error(response.status);

  return { user, status };
};

export default signup;

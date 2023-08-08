import { emailPasswordSignIn } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { LoginCredentials, SignInUpPromise, UserType } from "../types";

const login = async (
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

  const response = await emailPasswordSignIn(data);

  if (response.status === "OK") {
    user = response.user as UserType;
    status = response.status;

    return { user, status };
  } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
    throw new Error("401");
  }
};

export default login;

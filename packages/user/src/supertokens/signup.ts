import { emailPasswordSignUp as register } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { LoginCredentials, SignInUpPromise, UserType } from "../types";

const signup = async (
  credentials: LoginCredentials,
): Promise<SignInUpPromise | void> => {
  let user: UserType;
  let status: string;
  let response;

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

  try {
    response = await register(data);
  } catch (error) {
    throw new Error();
  }

  if (response.status === "OK") {
    user = response.user as UserType;
    status = response.status;

    return { user, status };
  } else if (response.status === "FIELD_ERROR") {
    throw {
      name: response.formFields[0].id,
      status: response.status,
      message: response.formFields[0].error,
    } as Error;
  } else {
    throw new Error();
  }
};

export default signup;

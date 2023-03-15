import { toast } from "react-toastify";
import { emailPasswordSignUp as register } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { LoginCredentials, UserType } from "../types";

interface IPromise {
  user: UserType | undefined;
  status: string | undefined;
}

const signup = async (
  credentials: LoginCredentials
): Promise<IPromise | undefined> => {
  let user: UserType | undefined;
  let status: string | undefined;

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
    const response = await register(data);
    if (response.status !== "FIELD_ERROR") {
      user = response.user as UserType;
      status = response.status;
    } else status = response.status;
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }

  return { user, status };
};

export default signup;

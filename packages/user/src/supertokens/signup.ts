import { toast } from "react-toastify";
import {
  emailPasswordSignUp as register,
  EmailPasswordUserType,
} from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { LoginCredentials } from "../types";

interface IPromise {
  user: EmailPasswordUserType | undefined;
  status: string | undefined;
}

const signup = async (
  credentials: LoginCredentials
): Promise<IPromise | undefined> => {
  let user: EmailPasswordUserType | undefined;
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
      user = response.user;
      status = response.status;
    } else status = response.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    let errorMessage = "Oops! Something went wrong.";
    if (err.isSuperTokensGeneralError === true) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }

  return { user, status };
};

export default signup;

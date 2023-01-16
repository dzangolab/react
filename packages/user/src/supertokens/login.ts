import { toast } from "react-toastify";
import {
  EmailPasswordUserType,
  emailPasswordSignIn,
} from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { LoginCredentials } from "../types";

interface IPromise {
  user: EmailPasswordUserType | undefined;
  status: string | undefined;
}

const login = async (
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
    const response = await emailPasswordSignIn(data);
    if (response.status === "OK") {
      user = response.user;
      status = response.status;
    } else {
      status = response.status;
      toast.error(status);
    }
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

export default login;

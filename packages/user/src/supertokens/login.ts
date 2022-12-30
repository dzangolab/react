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
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }

  return { user, status };
};

export default login;

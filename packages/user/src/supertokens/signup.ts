import { toast } from "react-toastify";
import { signUp as register } from "supertokens-web-js/recipe/emailpassword";

import type { LoginCredentials } from "../types";
import type { UserType } from "supertokens-web-js/recipe/emailpassword";

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
      user = response.user;
      status = response.status;
    } else status = response.status;
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    } else {
      toast.error("Oops! Something went wrong.");
    }
  }

  return { user, status };
};

export default signup;

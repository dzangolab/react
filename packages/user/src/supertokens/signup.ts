import { emailPasswordSignUp as register } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import type { SignInUpPromise, UserSignupPayload, UserType } from "../types";

export const signup = async (
  signupData: UserSignupPayload,
): Promise<SignInUpPromise | void> => {
  let user: UserType;
  let status: string;
  let response;

  try {
    response = await register(signupData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

import Session from "supertokens-web-js/recipe/session";
import { emailPasswordSignIn } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";

import logout from "./logout";
import { removeUserData } from "../helpers";

import type { LoginCredentials, UserType } from "../types";

interface IPromise {
  user: UserType;
  status: string;
}

const login = async (
  credentials: LoginCredentials
): Promise<IPromise | undefined> => {
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

async function verifySession(
  claims: string[],
  redirectURL?: string
): Promise<boolean> {
  if (await Session.doesSessionExist()) {
    let errorCount = 0;

    const validationErrors = await Session.validateClaims({
      overrideGlobalClaimValidators: (globalValidators) => {
        const validators = claims.map((claim) =>
          UserRoleClaim.validators.includes(claim)
        );

        return [
          ...globalValidators,
          ...validators,
          /* PermissionClaim.validators.includes("modify") */
        ];
      },
    });

    if (validationErrors.length === 0) {
      return true;
    }

    for (const err of validationErrors) {
      if (err.validatorId === UserRoleClaim.id) {
        // user roles claim check failed
        errorCount += 1;
      } else {
        // some other claim check failed (from the global validators list)
      }
    }

    if (errorCount < claims.length) {
      // some user roles claim check passed
      return true;
    } else {
      // all user roles claim check failed
      if (redirectURL) {
        window.location.href = redirectURL;
      } else {
        await removeUserData();
        await logout();
      }
    }
  }
  // either a session does not exist, or one of the validators failed.
  // so we do not allow access to this page.
  return false;
}

export default login;
export { verifySession };

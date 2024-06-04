import EmailVerification from "supertokens-web-js/recipe/emailverification";
import Session from "supertokens-web-js/recipe/session";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";

import logout from "./logout";
import ProfileValidationClaim from "./profileValidationClaim";
import { removeUserData } from "../helpers";

/**
 * Get User roles
 */
async function getUserRoles(): Promise<string[]> {
  if (await Session.doesSessionExist()) {
    const roles = await Session.getClaimValue({ claim: UserRoleClaim });

    return roles ? roles : [];
  }

  return [];
}

/**
 * Verify if the user has at least one role from the given roles
 *
 * @param claims List of roles to be verified
 */
async function verifySessionRoles(claims: string[]): Promise<boolean> {
  if (await Session.doesSessionExist()) {
    let errorCount = 0;

    const validationErrors = await Session.validateClaims({
      overrideGlobalClaimValidators: (globalValidators) => {
        const validators = claims.map((claim) =>
          UserRoleClaim.validators.includes(claim),
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
      await removeUserData();
      await logout();
    }
  }
  // either a session does not exist, or one of the validators failed.
  // so we do not allow access to this page.
  return false;
}

const isEmailVerified = async (): Promise<boolean | undefined> => {
  if (await Session.doesSessionExist()) {
    const { isVerified } = await EmailVerification.isEmailVerified();

    if (isVerified) {
      return true;
    }
  }

  return false;
};

/**
 * Checks if the user's profile is completed based on validation criteria.
 *
 * @async
 * @function isProfileCompleted
 * @returns {Promise<boolean|undefined>} - A promise that resolves to:
 *   - `true` if the profile is completed.
 *   - `false` if the profile is not completed or no session exists.
 *   - `undefined` if the profile validation is disabled in the api.
 *
 */
const isProfileCompleted = async (): Promise<boolean | undefined> => {
  if (await Session.doesSessionExist()) {
    const validatorFailures = await Session.validateClaims({
      overrideGlobalClaimValidators: () => {
        // Only check for profile validation
        return [ProfileValidationClaim.validators.isTrue()];
      },
    });

    if (
      validatorFailures.length &&
      validatorFailures[0].reason.actualValue === undefined
    ) {
      return;
    }

    return !validatorFailures.length;
  }

  return false;
};

export {
  getUserRoles,
  isEmailVerified,
  isProfileCompleted,
  verifySessionRoles,
};

import { BooleanClaim } from "supertokens-web-js/recipe/session";

const ProfileValidationClaim = new BooleanClaim({
  id: "profileValidation",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: async () => {},
  defaultMaxAgeInSeconds: undefined,
});

export default ProfileValidationClaim;

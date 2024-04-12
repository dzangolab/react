import { PrimitiveArrayClaim } from "supertokens-web-js/recipe/session";

const UserRoleClaim = new PrimitiveArrayClaim<string>({
  id: "role",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: async () => {},
  defaultMaxAgeInSeconds: Number.MAX_SAFE_INTEGER,
});

export default UserRoleClaim;

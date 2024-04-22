import { PrimitiveArrayClaim } from "supertokens-web-js/recipe/session";

const UserPermissionClaim = new PrimitiveArrayClaim<string>({
  id: "permission",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: async () => {},
  defaultMaxAgeInSeconds: Number.MAX_SAFE_INTEGER,
});

export default UserPermissionClaim;

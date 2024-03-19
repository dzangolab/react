/**
 * Get User roles
 */
declare function getUserRoles(): Promise<string[]>;
/**
 * Verify if the user has at least one role from the given roles
 *
 * @param claims List of roles to be verified
 */
declare function verifySessionRoles(claims: string[]): Promise<boolean>;
declare const isUserVerified: () => Promise<boolean | undefined>;
export { getUserRoles, verifySessionRoles, isUserVerified };
//# sourceMappingURL=helpers.d.ts.map
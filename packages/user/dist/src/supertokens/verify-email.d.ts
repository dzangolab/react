interface IPromise {
    status: "EMAIL_ALREADY_VERIFIED" | "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | undefined;
}
declare const verifyEmail: () => Promise<IPromise | undefined>;
export default verifyEmail;
//# sourceMappingURL=verify-email.d.ts.map
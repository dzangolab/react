import React from "react";
import type { LoginCredentials, SignInUpPromise } from "../types";
interface IProperties {
    handleSubmit?: (credentials: LoginCredentials) => void;
    onSignupFailed?: (error: Error) => void;
    onSignupSuccess?: (user: SignInUpPromise) => void;
    loading?: boolean;
    showForgotPasswordLink?: boolean;
    showLoginLink?: boolean;
}
export declare const SignupWrapper: React.FC<IProperties>;
export {};
//# sourceMappingURL=SignupWrapper.d.ts.map
/// <reference types="react" />
import type { SignInUpPromise } from "../types";
interface IProperties {
    onSignupFailed?: (error: Error) => void;
    onSignupSuccess?: (user: SignInUpPromise) => void;
    showForgotPasswordLink?: boolean;
    showLoginLink?: boolean;
}
export declare const Signup: React.FC<IProperties>;
export {};
//# sourceMappingURL=Signup.d.ts.map
/// <reference types="react" />
import type { SignInUpPromise } from "../types";
interface IProperties {
    centered?: boolean;
    customDivider?: React.ReactNode;
    onLoginFailed?: (error: Error) => void;
    onLoginSuccess?: (user: SignInUpPromise) => void;
    orientation?: "horizontal" | "vertical";
    showForgotPasswordLink?: boolean;
    showSignupLink?: boolean;
    socialLoginFirst?: boolean;
}
export declare const Login: React.FC<IProperties>;
export {};
//# sourceMappingURL=Login.d.ts.map
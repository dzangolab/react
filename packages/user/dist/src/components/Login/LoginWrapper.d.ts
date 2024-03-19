import { FC } from "react";
import type { LoginCredentials, SignInUpPromise } from "../../types";
interface IProperties {
    handleSubmit?: (credential: LoginCredentials) => void;
    onLoginFailed?: (error: Error) => void;
    onLoginSuccess?: (user: SignInUpPromise) => void;
    loading?: boolean;
    showForgotPasswordLink?: boolean;
    showSignupLink?: boolean;
}
export declare const LoginWrapper: FC<IProperties>;
export {};
//# sourceMappingURL=LoginWrapper.d.ts.map
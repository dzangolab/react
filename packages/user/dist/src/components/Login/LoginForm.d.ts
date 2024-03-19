/// <reference types="react" />
import { LoginCredentials } from "../../types";
interface Properties {
    handleSubmit: (credentials: LoginCredentials) => void;
    loading?: boolean;
}
export declare const LoginForm: ({ handleSubmit, loading }: Properties) => import("react").JSX.Element;
export {};
//# sourceMappingURL=LoginForm.d.ts.map
import React from "react";
import type { LoginCredentials } from "../types";
interface Properties {
    email?: string;
    handleSubmit: (credentials: LoginCredentials) => void;
    loading?: boolean;
}
declare const SignupForm: ({ email, handleSubmit, loading }: Properties) => React.JSX.Element;
export default SignupForm;
//# sourceMappingURL=SignupForm.d.ts.map
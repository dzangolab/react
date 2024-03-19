import * as zod from "zod";
interface PasswordConfirmationSchema {
    passwordValidationMessage?: string;
    passwordRequiredMessage?: string;
    confirmPasswordRequiredMessage?: string;
}
declare const schema: ({ passwordValidationMessage, passwordRequiredMessage, confirmPasswordRequiredMessage, }: PasswordConfirmationSchema) => {
    password: zod.ZodEffects<zod.ZodString, string, string>;
    confirmPassword: zod.ZodString;
};
export default schema;
//# sourceMappingURL=PasswordConfirmation.d.ts.map
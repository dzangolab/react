import { ReactElement } from "react";
import { UseFormGetFieldState, UseFormRegister, useFormContext } from "react-hook-form";
interface EmailErrorMessages {
    invalid?: string;
    required?: string;
}
interface PasswordErrorMessages {
    required?: string;
    weak?: string;
}
interface CustomInputProperties {
    disabled?: boolean;
    getFieldState?: UseFormGetFieldState<any>;
    label?: string;
    name: string;
    placeholder?: string;
    register?: UseFormRegister<any>;
    showValidState?: boolean;
    showInvalidState?: boolean;
    submitcount?: number;
}
export type AdditionalFormSchema = Zod.ZodObject<any>;
export type AdditionalDefaultValues = Record<string, any>;
export type RenderAdditionalFormFields = (formContext: typeof useFormContext) => ReactElement;
interface AdditionalFormFields {
    defaultValues: AdditionalDefaultValues;
    schema: AdditionalFormSchema;
    renderFields: RenderAdditionalFormFields;
}
export type { AdditionalFormFields, CustomInputProperties, EmailErrorMessages, PasswordErrorMessages, UseFormRegister, };
export type { IsEmailOptions, StrongPasswordOptions } from "./validator";
//# sourceMappingURL=index.d.ts.map
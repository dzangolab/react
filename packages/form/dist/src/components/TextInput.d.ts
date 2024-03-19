import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";
interface ITextInput {
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    name: string;
    showValidState?: boolean;
    showInvalidState?: boolean;
    submitcount?: number;
    /** @deprecated */
    getFieldState?: UseFormGetFieldState<any>;
    /** @deprecated */
    register?: UseFormRegister<any>;
}
export declare const TextInput: React.FC<ITextInput>;
export {};
//# sourceMappingURL=TextInput.d.ts.map
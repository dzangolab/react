import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";
type IProperties = {
    disabled?: boolean;
    defaultValue?: string;
    label?: string;
    name: string;
    placeholder?: string;
    readOnly?: boolean;
    showValidState?: boolean;
    showInvalidState?: boolean;
    submitcount?: number;
    /** @deprecated */
    getFieldState?: UseFormGetFieldState<any>;
    /** @deprecated */
    register?: UseFormRegister<any>;
};
export declare const Email: React.FC<IProperties>;
export {};
//# sourceMappingURL=Email.d.ts.map
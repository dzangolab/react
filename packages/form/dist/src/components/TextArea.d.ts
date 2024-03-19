import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";
interface ITextArea {
    label?: string;
    name: string;
    placeholder?: string;
    showValidState?: boolean;
    showInvalidState?: boolean;
    submitcount?: number;
    getFieldState?: UseFormGetFieldState<any>;
    register?: UseFormRegister<any>;
}
export declare const TextArea: React.FC<ITextArea>;
export {};
//# sourceMappingURL=TextArea.d.ts.map
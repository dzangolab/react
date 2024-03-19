import { HTMLAttributes } from "react";
interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    errorMessage?: string;
    hasError?: boolean;
    label?: string;
    name?: string;
    readOnly?: boolean;
    type?: "text" | "number" | "email";
}
export declare const Input: ({ defaultValue, disabled, errorMessage, hasError, label, name, placeholder, readOnly, type, onChange, ...others }: IInputProperties) => import("react").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map
import React from "react";
import type { ErrorOption } from "react-hook-form";
interface Role {
    name: string;
    id: number;
}
interface IProperties {
    name: string;
    value: Role;
    label?: string;
    placeholder?: string;
    onChange: (role: Role) => void;
    inputRef: React.Ref<HTMLInputElement>;
    options: Role[];
    error?: ErrorOption;
}
export declare const RolePickerBasic: ({ name, value, label, placeholder, onChange, inputRef, options, error, }: IProperties) => React.JSX.Element;
export {};
//# sourceMappingURL=RolePickerBasic.d.ts.map
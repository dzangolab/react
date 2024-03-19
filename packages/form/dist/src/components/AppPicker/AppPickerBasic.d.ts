import React from "react";
import type { RoleOption } from "../RolePicker";
import type { ErrorOption } from "react-hook-form";
export interface AppOption {
    id: number;
    name: string;
    origin: string;
    supportedRoles?: RoleOption[];
}
interface IProperties {
    error?: ErrorOption;
    inputRef: React.Ref<HTMLInputElement>;
    label?: string;
    name: string;
    options: AppOption[];
    placeholder?: string;
    value: AppOption;
    onChange: (app: AppOption) => void;
}
export declare const AppPickerBasic: ({ error, inputRef, label, name, options, placeholder, value, onChange, }: IProperties) => React.JSX.Element;
export {};
//# sourceMappingURL=AppPickerBasic.d.ts.map
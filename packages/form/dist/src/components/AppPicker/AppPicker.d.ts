import React from "react";
import type { RoleOption } from "../RolePicker";
export interface App {
    id: number;
    name: string;
    origin: string;
    supportedRoles?: RoleOption[];
}
export interface IProperties {
    label?: string;
    name: string;
    options: App[];
    placeholder?: string;
}
export declare const AppPicker: ({ label, name, options, placeholder, }: IProperties) => React.JSX.Element;
//# sourceMappingURL=AppPicker.d.ts.map
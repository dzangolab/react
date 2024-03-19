import React from "react";
export interface RoleOption {
    name: string;
    id: number;
}
interface IProperties {
    name: string;
    label?: string;
    placeholder?: string;
    options: RoleOption[];
}
export declare const RolePicker: ({ name, placeholder, options, label, }: IProperties) => React.JSX.Element;
export {};
//# sourceMappingURL=RolePicker.d.ts.map
import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";
interface ISelect {
    label?: string;
    name: string;
    options: {
        value: string;
        label: string;
        disabled?: boolean;
    }[];
    getFieldState?: UseFormGetFieldState<any>;
    register?: UseFormRegister<any>;
}
export declare const Select: React.FC<ISelect>;
export {};
//# sourceMappingURL=Select.d.ts.map
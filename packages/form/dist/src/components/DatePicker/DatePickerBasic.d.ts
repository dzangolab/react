import { Nullable } from "primereact/ts-helpers";
import { FC } from "react";
import type { ErrorOption } from "react-hook-form";
export interface DatePickerBasicProperties {
    dateFormat?: string;
    error?: ErrorOption;
    inputRef: React.Ref<HTMLInputElement>;
    label?: string;
    name: string;
    maxDate?: Date;
    minDate?: Date;
    placeholder?: string;
    onChange: (value: Nullable<string | Date | Date[]>) => void;
    value: Date;
}
export declare const DatePickerBasic: FC<DatePickerBasicProperties>;
//# sourceMappingURL=DatePickerBasic.d.ts.map
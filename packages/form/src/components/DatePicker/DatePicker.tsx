import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { DatePickerBasic } from "./DatePickerBasic";

export interface DatePicker {
  className?: string;
  dateFormat?: string;
  label?: string;
  name: string;
  maxDate?: Date;
  minDate?: Date;
  placeholder?: string;
}

export const DatePicker: FC<DatePicker> = ({
  className,
  dateFormat,
  label,
  name,
  maxDate,
  minDate,
  placeholder,
}) => {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState(name);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePickerBasic
            inputRef={field.ref}
            className={className}
            name={name}
            maxDate={maxDate}
            minDate={minDate}
            onChange={field.onChange}
            error={error}
            label={label}
            placeholder={placeholder}
            value={field.value}
            dateFormat={dateFormat}
          />
        )}
      />
    </>
  );
};

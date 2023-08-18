import { Controller, useFormContext } from "react-hook-form";
import { DatePickerBasic } from "./DatePickerBasic";
import { FC } from "react";

export interface DatePicker {
  label?: string;
  name: string;
  placeholder?: string;
}

const DatePicker: FC<DatePicker> = ({ label, name, placeholder }) => {
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
            name={name}
            onChange={field.onChange}
            error={error}
            label={label}
            placeholder={placeholder}
            value={field.value}
          />
        )}
      />
    </>
  );
};

export default DatePicker;

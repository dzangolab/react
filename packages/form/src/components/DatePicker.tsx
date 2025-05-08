import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { DatePicker as DatePickerBasic } from "@dzangolab/react-ui";

export interface DatePicker {
  className?: string;
  dateFormat?: string;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  name: string;
  panelClassName?: string;
  placeholder?: string;
}

export const DatePicker: FC<DatePicker> = ({
  className,
  dateFormat,
  label,
  maxDate,
  minDate,
  name,
  panelClassName,
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
            error={error?.message}
            label={label}
            panelClassName={panelClassName}
            placeholder={placeholder}
            value={field.value}
            dateFormat={dateFormat}
          />
        )}
      />
    </>
  );
};

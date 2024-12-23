import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { FC } from "react";

import { ErrorMessage } from "../ErrorMessage";

import type { ErrorOption } from "react-hook-form";

export interface DatePickerBasicProperties {
  className?: string;
  dateFormat?: string;
  error?: ErrorOption;
  inputRef: React.Ref<HTMLInputElement>;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  name: string;
  panelClassName?: string;
  placeholder?: string;
  onChange: (value: Nullable<string | Date | Date[]>) => void;
  value: Date;
}

export const DatePickerBasic: FC<DatePickerBasicProperties> = ({
  className = "",
  dateFormat = "dd/mm/yy",
  error,
  inputRef,
  label,
  maxDate,
  minDate,
  name,
  panelClassName,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}

      <Calendar
        id={name}
        value={value}
        placeholder={placeholder}
        inputRef={inputRef}
        onChange={(event) => onChange(event.value)}
        className={classNames({ "p-invalid": error })}
        panelClassName={panelClassName}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat={dateFormat}
      />

      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { FC } from "react";

import { ErrorMessage } from "../ErrorMessage";

export interface DatePickerBasicProperties {
  error?: any;
  inputRef: React.Ref<HTMLInputElement>;
  label?: string;
  name: string;
  maxDate?: Date;
  minDate?: Date;
  placeholder?: string;
  onChange: (value: Nullable<string | Date | Date[]>) => void;
  value: Date;
}

export const DatePickerBasic: FC<DatePickerBasicProperties> = ({
  error,
  inputRef,
  label,
  name,
  maxDate,
  minDate,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}

      <Calendar
        id={name}
        value={value}
        placeholder={placeholder}
        inputRef={inputRef}
        onChange={(event) => onChange(event.value)}
        className={classNames({ "p-invalid": error })}
        panelClassName={name}
        maxDate={maxDate}
        minDate={minDate}
      />

      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

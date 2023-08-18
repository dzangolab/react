import { FC } from "react";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { ErrorMessage } from "../ErrorMessage";
import { Nullable } from "primereact/ts-helpers";

export interface DatePickerBasicProperties {
  error?: any;
  inputRef: React.Ref<HTMLInputElement>;
  label?: string;
  name: string;
  placeholder?: string;
  onChange: (value: Nullable<string | Date | Date[]>) => void;
  value: Date;
}

export const DatePickerBasic: FC<DatePickerBasicProperties> = ({
  error,
  inputRef,
  label,
  name,
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
        appendTo="self"
      />

      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

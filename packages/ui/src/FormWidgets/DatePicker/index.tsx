import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { FC } from "react";

export interface DatePickerProperties
  extends Omit<CalendarProps, "value" | "onChange" | "inputRef"> {
  className?: string;
  error?: string;
  inputRef: React.Ref<HTMLInputElement>;
  label?: string;
  name: string;
  onChange: (value: Nullable<string | Date | Date[]>) => void;
  value: Date;
}

export const DatePicker: FC<DatePickerProperties> = ({
  className = "",
  dateFormat = "dd/mm/yy",
  error,
  inputRef,
  label,
  name,
  onChange,
  value,
  ...others
}) => {
  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}

      <Calendar
        id={name}
        value={value}
        inputRef={inputRef}
        onChange={(event) => onChange(event.value)}
        className={classNames({ "p-invalid": error })}
        dateFormat={dateFormat}
        {...others}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

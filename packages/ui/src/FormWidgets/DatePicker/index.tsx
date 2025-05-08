import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { FC } from "react";

export interface DatePickerProperties {
  className?: string;
  dateFormat?: string;
  error?: string;
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

export const DatePicker: FC<DatePickerProperties> = ({
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

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

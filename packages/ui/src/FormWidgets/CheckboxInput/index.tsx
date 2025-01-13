import { InputHTMLAttributes } from "react";

interface IOption {
  label: string;
  value: string;
}
export interface ICheckboxInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: string | React.ReactNode;
  name?: string;
  options: IOption[];
}

export const CheckboxInput: React.FC<ICheckboxInputProperties> = ({
  className = "",
  disabled,
  errorMessage,
  hasError,
  helperText,
  label = "",
  name,
  onChange,
  options,
  value,
  ...others
}) => {
  return (
    <fieldset className={`field ${className}`.trim()}>
      <legend>{label}</legend>
      {options?.map(({ label: optionLabel, value: optionValue }) => (
        <div className="checkbox-button-wrapper" key={optionValue}>
          <input
            aria-invalid={hasError}
            disabled={disabled}
            id={optionValue}
            name={name}
            onChange={onChange}
            type="checkbox"
            {...others}
          ></input>
          {optionLabel && <label htmlFor={optionValue}>{optionLabel}</label>}
        </div>
      ))}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </fieldset>
  );
};

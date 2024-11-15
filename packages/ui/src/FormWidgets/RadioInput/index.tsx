import { InputHTMLAttributes } from "react";

interface IOption {
  label: string;
  value: string;
}
export interface IRadioInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: string | React.ReactNode;
  name?: string;
  options: IOption[];
}

export const RadioInput: React.FC<IRadioInputProperties> = ({
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
    <div className={`field ${className}`.trim()}>
      {label}
      {options?.map(({ label: optionLabel, value: optionValue }) => (
        <div className="radio-button-wrapper" key={optionValue}>
          <input
            aria-invalid={hasError}
            checked={optionValue === value}
            disabled={disabled}
            id={optionValue}
            name={name}
            onChange={onChange}
            type="radio"
            value={optionValue}
            {...others}
          ></input>
          {optionLabel && <label htmlFor={optionValue}>{optionLabel}</label>}
        </div>
      ))}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

import { InputHTMLAttributes } from "react";

export interface IRadioInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: string | React.ReactNode;
  name?: string;
}

export const RadioInput: React.FC<IRadioInputProperties> = ({
  className = "",
  disabled,
  errorMessage,
  hasError,
  helperText,
  label = "",
  name,
  ...others
}) => {
  return (
    <div className={`field ${className}`.trim()}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type="radio"
        disabled={disabled}
        aria-invalid={hasError}
        {...others}
      ></input>
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

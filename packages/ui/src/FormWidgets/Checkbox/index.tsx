import { InputHTMLAttributes } from "react";

export interface ICheckboxProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: string | React.ReactNode;
}

export const Checkbox: React.FC<ICheckboxProperties> = ({
  checked,
  disabled,
  errorMessage,
  hasError,
  helperText,
  label,
  name,
  onChange,
  value,
  ...others
}) => {
  return (
    <div className="checkbox-wrapper">
      <input
        aria-invalid={hasError}
        checked={checked}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        type="checkbox"
        {...others}
      ></input>
      {label && <label htmlFor={name}>{label}</label>}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

import { InputHTMLAttributes } from "react";

export interface IInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  type?: "text" | "number" | "email";
}

export const Input = ({
  className,
  defaultValue,
  disabled,
  errorMessage,
  hasError,
  label,
  name = "",
  placeholder,
  readOnly,
  type,
  onChange,
  ...others
}: IInputProperties) => {
  return (
    <div className={`field ${name} ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={`input-field ${name}`}
        aria-invalid={hasError}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        {...others}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

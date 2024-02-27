import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  type?: "text" | "number" | "email";
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
}

export const Input = ({
  className,
  disabled,
  readOnly,
  value,
  hasError,
  errorMessage,
  label,
  name,
  onChange,
  placeholder,
  type,
  ...others
}: IInputProperties) => {
  return (
    <div className={`field-wrapper ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={`input-field ${name}`} aria-invalid={hasError}>
        <input
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          {...others}
        />
      </div>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

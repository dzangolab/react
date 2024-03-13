import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  name?: string;
  readOnly?: boolean;
  type?: "text" | "number" | "email";
}

export const Input = ({
  defaultValue,
  disabled,
  errorMessage,
  hasError,
  label,
  name,
  placeholder,
  readOnly,
  type,
  onChange,
  ...others
}: IInputProperties) => {
  return (
    <div className={`field ${name}`.trimEnd()}>
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

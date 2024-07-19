import { InputHTMLAttributes } from "react";

export interface IInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  type?: "text" | "number" | "email";
}

export const Input = ({
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
    <div className={`field ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...others}
        id={name}
        className={`input-field ${name}`}
        aria-invalid={hasError}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

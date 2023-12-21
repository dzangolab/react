import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  type?: "text" | "number";
}

export const Input = ({
  className,
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
          {...others}
        />
      </div>
      {hasError && errorMessage && (
        <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
};

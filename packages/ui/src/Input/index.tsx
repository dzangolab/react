import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  type?: "text" | "number";
}

export const Input = ({
  className,
  error,
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
      <div className={`q ${name}`} aria-invalid={error}>
        <input
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          {...others}
        />
      </div>
      {error && errorMessage && (
        <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
};

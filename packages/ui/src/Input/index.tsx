import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  type?: "text" | "number";
  label?: string;
  name?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Input = ({
  errorMessage,
  type,
  label,
  name,
  error,
  placeholder,
  onChange,
  ...others
}: IInputProperties) => {
  return (
    <div className="input-field-wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={error}
        {...others}
      />
      {error && errorMessage && (
        <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
};

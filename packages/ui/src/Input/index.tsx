import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  type?: "text" | "number";
}

export const Input = ({
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

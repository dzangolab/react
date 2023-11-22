import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  error?: string;
}

export const Input = ({
  label,
  name,
  error,
  placeholder,
  onChange,
  ...others
}: IInputProperties) => {
  return (
    <div className={`input-field ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...others}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

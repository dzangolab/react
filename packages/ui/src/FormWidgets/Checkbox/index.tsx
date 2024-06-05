import { InputHTMLAttributes } from "react";

interface IProperties extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export const Checkbox: React.FC<IProperties> = ({
  name,
  label,
  onChange,
  errorMessage,
  ...others
}) => {
  return (
    <div className="checkbox-wrapper">
      <input
        {...others}
        id={name}
        type="checkbox"
        name={name}
        onChange={onChange}
      />
      {label && <label htmlFor={name}>{label}</label>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

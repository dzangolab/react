import { InputHTMLAttributes } from "react";

interface IProperties extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  helperText?: string;
  label?: string | React.ReactNode;
  modelValue?: boolean;
}

export const Checkbox: React.FC<IProperties> = ({
  disabled,
  errorMessage,
  helperText,
  label,
  modelValue,
  name,
  onChange,
  value,
  ...others
}) => {
  return (
    <div className="checkbox-wrapper">
      <input
        checked={modelValue}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        type="checkbox"
        value={value}
        {...others}
      />
      {label && <label htmlFor={name}>{label}</label>}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

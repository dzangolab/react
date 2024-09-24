import { InputHTMLAttributes } from "react";

export interface ISwitchInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  name?: string;
}

export const SwitchInput: React.FC<ISwitchInputProperties> = ({
  className = "",
  disabled,
  errorMessage,
  hasError,
  label = "",
  name,
  ...others
}) => {
  return (
    <div className={`field switch-toggle ${className}`.trim()}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type="checkbox"
        disabled={disabled}
        aria-invalid={hasError}
        {...others}
      ></input>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

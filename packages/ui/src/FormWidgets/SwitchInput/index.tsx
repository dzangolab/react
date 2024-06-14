import { InputHTMLAttributes } from "react";

export interface ISwitchInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  hasError?: boolean;
  errorMessage?: string;
  label?: string;
  disabled?: boolean;
}

export const SwitchInput: React.FC<ISwitchInputProperties> = ({
  hasError,
  errorMessage,
  label = "",
  name,
  disabled,
  ...others
}) => {
  return (
    <div className={`field switch-toggle ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="checkbox"
        disabled={disabled}
        aria-invalid={hasError}
        {...others}
      ></input>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

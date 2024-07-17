import { InputHTMLAttributes, forwardRef } from "react";

export interface IInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  type?: "text" | "number" | "email";
}

export const Input = forwardRef<HTMLInputElement, IInputProperties>(
  (
    {
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
    }: IInputProperties,
    reference,
  ) => {
    return (
      <div className={`field ${name}`.trimEnd()}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          ref={reference}
          id={name}
          className={`input-field ${name}`}
          aria-invalid={hasError}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          {...others}
        />
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </div>
    );
  },
);

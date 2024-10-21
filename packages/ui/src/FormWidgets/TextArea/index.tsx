import { TextareaHTMLAttributes } from "react";

export interface ITextareaProperties
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
}

export const Textarea = ({
  className,
  defaultValue,
  disabled,
  errorMessage,
  hasError,
  label,
  name = "",
  placeholder,
  readOnly,
  onChange,
  ...others
}: ITextareaProperties) => {
  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        className={`textarea-field ${name}`.trimEnd()}
        aria-invalid={hasError}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        {...others}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

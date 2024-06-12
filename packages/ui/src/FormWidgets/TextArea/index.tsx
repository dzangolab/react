import { TextareaHTMLAttributes } from "react";

export interface ITextAreaProperties
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
}

export const Textarea = ({
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
}: ITextAreaProperties) => {
  return (
    <div className={`field ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        className={`textarea-field ${name}`}
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

import React, { useRef } from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface IDateInput {
  label?: string | React.ReactNode;
  name: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  helperText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  disabled?: boolean;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const DateInput: React.FC<IDateInput> = ({
  className = "",
  disabled,
  register,
  getFieldState,
  helperText,
  label = "",
  name,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
}) => {
  if (!register || !getFieldState) return null;

  const inputReference = useRef<HTMLInputElement | null>(null);

  const { error, invalid } = getFieldState(name);

  const { ref, ...rest } = register(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  const handleClick = () => {
    if (inputReference.current) {
      inputReference.current.showPicker();
    }
  };

  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...rest}
        id={`input-field-${name}`}
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
        type="date"
        disabled={disabled}
        onClick={handleClick}
        ref={(event) => {
          ref(event);
          inputReference.current = event;
        }}
      />
      {helperText && <span className="helper-text">{helperText}</span>}
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

import React from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Email: React.FC<
  CustomInputProperties & { readOnly?: boolean }
> = ({
  disabled = false,
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
  readOnly = false,
  submitcount = 0,
  showInvalidState = true,
  showValidState = true,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  const renderAriaInvalid = () => {
    if (showInvalidState && isDirty && invalid) return true;

    if (showValidState && isTouched && !invalid) return false;
  };

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name)}
        id={`input-field-${name}`}
        type="email"
        placeholder={placeholder}
        aria-invalid={submitcount > 0 ? renderAriaInvalid() : undefined}
        readOnly={readOnly}
        disabled={disabled}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

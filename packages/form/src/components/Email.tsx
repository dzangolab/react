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
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name)}
        id={`input-field-${name}`}
        type="email"
        placeholder={placeholder}
        aria-invalid={submitcount > 0 ? invalid : undefined}
        readOnly={readOnly}
        disabled={disabled}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

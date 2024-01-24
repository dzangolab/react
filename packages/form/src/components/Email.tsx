import React from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Email: React.FC<
  CustomInputProperties & { readOnly?: boolean; isSignup?: boolean }
> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
  readOnly = false,
  submitcount = 0,
  isSignup = true,
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
        {...(isSignup && {
          "aria-invalid": submitcount > 0 ? invalid : undefined,
        })}
        readOnly={readOnly}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

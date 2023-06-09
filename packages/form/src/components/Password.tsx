import React from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Password: React.FC<CustomInputProperties> = ({
  getFieldState,
  label = "",
  name,
  placeholder = "",
  register,
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
        type="password"
        placeholder={placeholder}
        aria-invalid={submitcount > 0 ? invalid : undefined}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

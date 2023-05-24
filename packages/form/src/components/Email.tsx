import React from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Email: React.FC<CustomInputProperties> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
  submitCount = 0,
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
        aria-invalid={submitCount > 0 ? invalid : undefined}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

import React from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Password: React.FC<CustomInputProperties> = ({
  getFieldState,
  label = "",
  name,
  placeholder = "",
  register,
  submitCount = 0,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (submitCount > 0) {
    inputClassName = invalid ? "invalid" : "valid";
  }

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name)}
        id={`input-field-${name}`}
        className={inputClassName}
        type="password"
        placeholder={placeholder}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

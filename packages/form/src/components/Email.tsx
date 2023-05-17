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
        type="email"
        placeholder={placeholder}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

import React from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export type IInputField = CustomInputProperties &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

export const Input: React.FC<IInputField & { submitcount?: number }> = ({
  getFieldState,
  label = "",
  name,
  placeholder,
  register,
  showInvalidState = true,
  showValidState = true,
  submitcount = 0,
  type,
  ...others
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);

  let inputClassName = "";
  if (showValidState && !invalid) inputClassName = "valid";
  if (showInvalidState && invalid) inputClassName = "invalid";

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name, {
          valueAsNumber: type === "number" ? true : false,
        })}
        id={`input-field-${name}`}
        className={submitcount > 0 ? inputClassName : ""}
        type={type}
        placeholder={placeholder}
        {...others}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

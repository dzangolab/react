import React from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export type IInputField = CustomInputProperties &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

export const Input: React.FC<IInputField> = ({
  getFieldState,
  label = "",
  name,
  placeholder,
  register,
  showValidationState = false,
  type,
  ...others
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (showValidationState) {
    if (isDirty && !invalid) {
      inputClassName = "valid";
    }
  }
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name, {
          valueAsNumber: type === "number" ? true : false,
        })}
        id={`input-field-${name}`}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        {...others}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

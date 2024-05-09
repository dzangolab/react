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
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  type,
  ...others
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name, {
          valueAsNumber: type === "number" ? true : false,
        })}
        id={`input-field-${name}`}
        type={type}
        placeholder={placeholder}
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
        {...others}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

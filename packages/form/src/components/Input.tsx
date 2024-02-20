import React, { useState } from "react";

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
  submitcount = 0,
  type,
  ...others
}) => {
  if (!register || !getFieldState) return null;
  console.log("count", submitcount);
  const { error, invalid } = getFieldState(name);
  const [showPassword, setShowPassword] = useState(false);

  let inputClassName = "";
  if (showValidState && !invalid) inputClassName = "valid";
  if (showInvalidState && invalid) inputClassName = "invalid";

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <div className={`input-field-${name}`}>
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
        {type === "password" && (
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
          </span>
        )}
      </div>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

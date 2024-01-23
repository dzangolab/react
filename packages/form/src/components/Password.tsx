import React, { useState } from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Password: React.FC<
  CustomInputProperties & {
    isSignup?: boolean;
  }
> = ({
  getFieldState,
  label = "",
  name,
  placeholder = "",
  register,
  submitcount = 0,
  isSignup = true,
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <div
        className="input-field-password"
        {...(isSignup && {
          "aria-invalid": submitcount > 0 ? invalid : undefined,
        })}
      >
        <input
          {...register(name)}
          id={`input-field-${name}`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...(isSignup && {
            "aria-invalid": submitcount > 0 ? invalid : undefined,
          })}
        ></input>
        <span
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
        </span>
      </div>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

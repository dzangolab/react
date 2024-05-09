import React, { useState } from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Password: React.FC<CustomInputProperties> = ({
  getFieldState,
  label = "",
  name,
  placeholder = "",
  register,
  submitCount = 0,
  showInvalidState = true,
  showValidState = true,
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);
  const [showPassword, setShowPassword] = useState(false);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <div
        className="input-field-password"
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
      >
        <input
          {...register(name)}
          id={`input-field-${name}`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
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

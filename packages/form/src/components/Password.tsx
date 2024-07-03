import { IInputProperties } from "@dzangolab/react-ui";
import React, { useState } from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Password: React.FC<CustomInputProperties & IInputProperties> = ({
  autoComplete = "new-password",
  getFieldState,
  label = "",
  name,
  placeholder = "",
  register,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
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
          {...others}
          {...register(name)}
          id={`input-field-${name}`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
          autoComplete={autoComplete}
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

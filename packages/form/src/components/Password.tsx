import React, { useState } from "react";

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export const Password: React.FC<CustomInputProperties> = ({
  getFieldState,
  label = "",
  name,
  placeholder = "",
  register,
  submitcount = 0,
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`field password-input ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name)}
        id={`input-field-${name}`}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        aria-invalid={submitcount > 0 ? invalid : undefined}
        className="input-field-password "
      ></input>
      <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
        <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
      </span>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

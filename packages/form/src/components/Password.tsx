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
  const [className, setClassName] = useState<string>("input-field-password");

  const handleFocus = () => {
    setClassName("input-field-password focused");
  };

  const handleBlur = () => {
    setClassName("input-field-password");
  };

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <div
        className={className}
        aria-invalid={submitcount > 0 ? invalid : undefined}
      >
        <input
          {...register(name)}
          id={`input-field-${name}`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={submitcount > 0 ? invalid : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
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

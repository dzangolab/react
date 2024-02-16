import React from "react";

import { Input } from "./Input";
import { CustomInputProperties } from "../types";

export const Email: React.FC<
  CustomInputProperties & { readOnly?: boolean }
> = ({
  disabled = false,
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
  readOnly = false,
  showInvalidState = true,
  showValidState = true,
}) => {
  return (
    <Input
      name={name}
      label={label}
      id={`input-field-${name}`}
      type="email"
      register={register}
      getFieldState={getFieldState}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      showInvalidState={showInvalidState}
      showValidState={showValidState}
    />
  );
};

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
  showInvalidState,
  showValidState,
  submitcount,
}) => {
  return (
    <Input
      name={name}
      label={label}
      type="email"
      register={register}
      getFieldState={getFieldState}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      showInvalidState={showInvalidState}
      showValidState={showValidState}
      submitcount={submitcount}
    />
  );
};

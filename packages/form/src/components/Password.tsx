import React from "react";

import { Input } from "./Input";
import { CustomInputProperties } from "../types";

export const Password: React.FC<CustomInputProperties> = ({
  getFieldState,
  label = "",
  name,
  placeholder = "",
  register,
  submitcount = 0,
  showInvalidState = true,
  showValidState = true,
}) => {
  return (
    <Input
      name={name}
      label={label}
      type="password"
      register={register}
      getFieldState={getFieldState}
      placeholder={placeholder}
      showInvalidState={showInvalidState}
      showValidState={showValidState}
      submitcount={submitcount}
    />
  );
};

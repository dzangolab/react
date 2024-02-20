import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { Input } from "./Input";

interface ITextInput {
  label?: string;
  placeholder?: string;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitcount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

export const TextInput: React.FC<ITextInput> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
  submitcount = 0,
  showInvalidState = true,
  showValidState = true,
}) => {
  return (
    <Input
      name={name}
      label={label}
      type="text"
      register={register}
      getFieldState={getFieldState}
      placeholder={placeholder}
      showInvalidState={showInvalidState}
      showValidState={showValidState}
      submitcount={submitcount}
    />
  );
};

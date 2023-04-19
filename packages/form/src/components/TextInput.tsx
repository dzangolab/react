import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextInput {
  register: UseFormRegister<any>;
  getFieldState: UseFormGetFieldState<any>;
  label?: string;
  placeholder?: string;
  name?: string;
}

export const TextInput: React.FC<ITextInput> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name = "textInput",
}) => {
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (isDirty && !invalid) inputClassName = "valid";
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className="field text-input">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...register(name)}
        className={inputClassName}
        type="text"
        placeholder={placeholder}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

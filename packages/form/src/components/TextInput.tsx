import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextInput {
  label?: string;
  placeholder?: string;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
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
  showInvalidState = true,
  showValidState = true,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (showValidState && isDirty && !invalid) inputClassName = "valid";
  if (showInvalidState && isTouched && invalid) inputClassName = "invalid";

  return (
    <div className={`field text-input ${name}`}>
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

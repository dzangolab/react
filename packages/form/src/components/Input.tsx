import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

export interface IInputField {
  getFieldState?: UseFormGetFieldState<any>;
  label?: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  type?: React.HTMLInputTypeAttribute;
}
const Input: React.FC<IInputField> = ({
  getFieldState,
  label = "",
  name,
  placeholder,
  register,
  type,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (isDirty && !invalid) inputClassName = "valid";
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name)}
        id={`input-field-${name}`}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

export default Input;

import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface IPassword {
  label?: string;
  placeholder?: string;
  name: string;
  getFieldState?: UseFormGetFieldState<any>;
  register?: UseFormRegister<any>;
}

export const Password: React.FC<IPassword> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (isDirty && !invalid) inputClassName = "valid";
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...register(name)}
        id={name}
        className={inputClassName}
        type="password"
        placeholder={placeholder}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

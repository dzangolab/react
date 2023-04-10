import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface IPassword {
  register: UseFormRegister<any>;
  getFieldState: UseFormGetFieldState<any>;
  label?: string;
  placeholder?: string;
  name?: string;
}

export const Password: React.FC<IPassword> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name = "password",
}) => {
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (isDirty && !invalid) inputClassName = "valid";
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className="field password">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...register("password")}
        className={inputClassName}
        type="password"
        placeholder={placeholder}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface IEmail {
  register: UseFormRegister<any>;
  getFieldState: UseFormGetFieldState<any>;
  label?: string;
  placeholder?: string;
  name?: string;
}

export const Email: React.FC<IEmail> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name = "email",
}) => {
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (isDirty && !invalid) inputClassName = "valid";
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className="field email">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...register("email")}
        className={inputClassName}
        type="email"
        placeholder={placeholder}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

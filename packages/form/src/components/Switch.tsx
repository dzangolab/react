import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ISwitch {
  label?: string;
  name: string;
  getFieldState?: UseFormGetFieldState<any>;
  register?: UseFormRegister<any>;
}

export const Switch: React.FC<ISwitch> = ({
  register,
  getFieldState,
  label = "",
  name,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let switchClassName = "";
  if (isDirty && !invalid) switchClassName = "valid";
  if (isTouched && invalid) switchClassName = "invalid";

  return (
    <div className={`field switch-toggle ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...register(name)}
        className={switchClassName}
        type="checkbox"
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

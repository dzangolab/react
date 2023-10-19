import React from "react";
import { InputSwitch } from "primereact/inputswitch";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ISwitch {
  checked: boolean;
  label?: string;
  name: string;
  getFieldState?: UseFormGetFieldState<any>;
  register?: UseFormRegister<any>;
}

export const SwitchInput: React.FC<ISwitch> = ({
  name,
  label,
  checked,
  getFieldState,
  register,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let switchClassName = "";
  if (isDirty && !invalid) switchClassName = "valid";
  if (isTouched && invalid) switchClassName = "invalid";

  return (
    <div className={`field switch-input ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <InputSwitch
        checked={checked}
        {...register(name)}
        className={switchClassName}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

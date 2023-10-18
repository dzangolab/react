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
  setChecked: (arguments_: boolean) => void;
}
export const SwitchInput: React.FC<ISwitch> = ({
  name,
  checked,
  label,
  getFieldState,
  register,
  setChecked,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let switchClassName = "";
  if (isDirty && !invalid) switchClassName = "valid";
  if (isTouched && invalid) switchClassName = "invalid";

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <InputSwitch
        {...register(name)}
        checked={checked}
        onChange={() => setChecked}
        className={switchClassName}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </>
  );
};

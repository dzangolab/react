import { InputSwitch } from "primereact/inputswitch";
import React, { useState } from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";
interface ISwitch {
  label?: string;
  name: string;
  getFieldState?: UseFormGetFieldState<any>;
  register?: UseFormRegister<any>;
}
export const SwitchInput: React.FC<ISwitch> = ({
  name,
  label,
  getFieldState,
  register,
}) => {
  const [checked, setChecked] = useState(true);
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
        onChange={() => setChecked((previous: boolean) => !previous)}
        className={switchClassName}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </>
  );
};

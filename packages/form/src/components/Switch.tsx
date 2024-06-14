import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ISwitch {
  label?: string;
  name: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  getFieldState?: UseFormGetFieldState<any>;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  register?: UseFormRegister<any>;
  disabled?: boolean;
}

/**
 * @deprecated Use SwitchInput component from the form package instead
 */
export const Switch: React.FC<ISwitch> = ({
  disabled,
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
        disabled={disabled}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

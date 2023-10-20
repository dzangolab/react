import { InputSwitch } from "primereact/inputswitch";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ISwitch {
  label?: string;
  name: string;
}

export const SwitchInput: React.FC<ISwitch> = ({ name, label }) => {
  const { control, getFieldState } = useFormContext();

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let switchClassName = "";
  if (isDirty && !invalid) switchClassName = "valid";
  if (isTouched && invalid) switchClassName = "invalid";

  return (
    <div className={`field switch-input ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <InputSwitch
              checked={field.value}
              inputRef={field.ref}
              className={switchClassName}
              onChange={(event) => field.onChange(event.value)}
            />
          );
        }}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ISelect {
  register: UseFormRegister<any>;
  getFieldState: UseFormGetFieldState<any>;
  label?: string;
  name?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

export const Select: React.FC<ISelect> = ({
  register,
  getFieldState,
  label = "",
  name = "select",
  options,
}) => {
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let selectClassName = "";
  if (isDirty && !invalid) selectClassName = "valid";
  if (isTouched && invalid) selectClassName = "invalid";

  return (
    <div className="field select-input">
      {label && <label htmlFor={name}>{label}</label>}
      <select {...register(name)} className={selectClassName}>
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

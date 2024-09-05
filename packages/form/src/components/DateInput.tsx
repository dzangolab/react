import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface IDateInput {
  label?: string;
  name: string;
  getFieldState?: UseFormGetFieldState<any>;
  register?: UseFormRegister<any>;
  disabled?: boolean;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const DateInput: React.FC<IDateInput> = ({
  disabled,
  register,
  getFieldState,
  label = "",
  name,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...register(name)}
        id={`input-field-${name}`}
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
        type="date"
        disabled={disabled}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

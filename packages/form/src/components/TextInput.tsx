import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextInput {
  label?: string;
  placeholder?: string;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitcount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

export const TextInput: React.FC<ITextInput> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
  submitcount = 0,
  showInvalidState = true,
  showValidState = true,
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);

  const renderAriaInvalid = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  return (
    <div className={`field text-input ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...register(name)}
        type="text"
        placeholder={placeholder}
        aria-invalid={submitcount > 0 ? renderAriaInvalid() : undefined}
      ></input>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

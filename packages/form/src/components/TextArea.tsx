import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextArea {
  label?: string;
  name: string;
  placeholder?: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitcount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

export const TextArea: React.FC<ITextArea> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
  showInvalidState = true,
  showValidState = true,
  submitcount = 0,
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  return (
    <div className={`field textarea-input ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        {...register(name)}
        placeholder={placeholder}
        aria-invalid={submitcount > 0 ? checkInvalidState() : undefined}
      ></textarea>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

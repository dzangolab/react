import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextArea {
  label?: string;
  name: string;
  placeholder?: string;
  showValidationState?: boolean;
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
  showValidationState = false,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let textareaClassName = "";
  if (showValidationState) {
    if (isDirty && !invalid) {
      textareaClassName = "valid";
    }
  }
  if (isTouched && invalid) textareaClassName = "invalid";

  return (
    <div className={`field textarea-input ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        {...register(name)}
        className={textareaClassName}
        placeholder={placeholder}
      ></textarea>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextArea {
  label?: string;
  name: string;
  placeholder?: string;
  getFieldState?: UseFormGetFieldState<any>;
  register?: UseFormRegister<any>;
}

export const TextArea: React.FC<ITextArea> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name,
}) => {
  if (!register || !getFieldState) return null;

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let textareaClassName = "";
  if (isDirty && !invalid) textareaClassName = "valid";
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

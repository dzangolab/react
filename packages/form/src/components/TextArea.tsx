import React from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextArea {
  register: UseFormRegister<any>;
  getFieldState: UseFormGetFieldState<any>;
  label?: string;
  placeholder?: string;
  name?: string;
}

export const TextArea: React.FC<ITextArea> = ({
  register,
  getFieldState,
  label = "",
  placeholder = "",
  name = "textarea",
}) => {
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let textareaClassName = "";
  if (isDirty && !invalid) textareaClassName = "valid";
  if (isTouched && invalid) textareaClassName = "invalid";

  return (
    <div className="field textarea-input">
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

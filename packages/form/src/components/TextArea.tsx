import React from "react";
import { useFormContext } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextArea {
  label?: string;
  placeholder?: string;
  name?: string;
  viewMode?: boolean;
}

export const TextArea: React.FC<ITextArea> = ({
  label = "",
  placeholder = "",
  name = "textarea",
  viewMode = false,
}) => {
  const { register, getFieldState, getValues } = useFormContext();

  const value = getValues(name);
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let textareaClassName = "";
  if (isDirty && !invalid) textareaClassName = "valid";
  if (isTouched && invalid) textareaClassName = "invalid";

  return (
    <div className={`${viewMode ? "info" : "field textarea-input"} ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      {viewMode ? (
        <span>{value}</span>
      ) : (
        <>
          <textarea
            {...register(name)}
            className={textareaClassName}
            placeholder={placeholder}
          ></textarea>
          {error?.message && <ErrorMessage message={error.message} />}
        </>
      )}
    </div>
  );
};

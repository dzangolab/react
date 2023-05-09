import React from "react";
import { useFormContext } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ITextInput {
  label?: string;
  placeholder?: string;
  name?: string;
  viewMode?: boolean;
}

export const TextInput: React.FC<ITextInput> = ({
  label = "",
  placeholder = "",
  name = "textInput",
  viewMode = false,
}) => {
  const { register, getFieldState, getValues } = useFormContext();

  const value = getValues(name);
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (isDirty && !invalid) inputClassName = "valid";
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className={`${viewMode ? "info" : "field text-input"} ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      {viewMode ? (
        <span>{value}</span>
      ) : (
        <>
          <input
            {...register(name)}
            className={inputClassName}
            type="text"
            placeholder={placeholder}
          ></input>
          {error?.message && <ErrorMessage message={error.message} />}
        </>
      )}
    </div>
  );
};

import React from "react";
import { useFormContext } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ISelect {
  label?: string;
  name?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  viewMode?: boolean;
}

export const Select: React.FC<ISelect> = ({
  label = "",
  name = "select",
  options,
  viewMode = false,
}) => {
  const { register, getFieldState, getValues } = useFormContext();

  const value = getValues(name);
  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let selectClassName = "";
  if (isDirty && !invalid) selectClassName = "valid";
  if (isTouched && invalid) selectClassName = "invalid";

  return (
    <div className={`${viewMode ? "info" : "field select-input"} ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      {viewMode ? (
        <span>{value}</span>
      ) : (
        <>
          <select {...register(name)} className={selectClassName}>
            {options.map(({ value, label, disabled }) => (
              <option key={value} value={value} disabled={disabled}>
                {label}
              </option>
            ))}
          </select>
          {error?.message && <ErrorMessage message={error.message} />}
        </>
      )}
    </div>
  );
};

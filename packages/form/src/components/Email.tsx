import { Input } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { CustomInputProperties } from "../types";

type IProperties = Omit<CustomInputProperties, "register" | "getFieldState"> & {
  readOnly?: boolean;
  defaultValue?: string;
};

export const Email: React.FC<IProperties> = ({
  defaultValue = "",
  disabled = false,
  label = "",
  placeholder = "",
  name,
  readOnly = false,
  submitcount = 0,
  showInvalidState = true,
  showValidState = true,
}) => {
  const { control, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          name={field.name}
          label={label}
          placeholder={placeholder}
          type="email"
          errorMessage={error?.message}
          defaultValue={field.value}
          onChange={field.onChange}
          hasError={submitcount > 0 ? checkInvalidState() : undefined}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
    />
  );
};

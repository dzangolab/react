import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@dzangolab/react-ui";

import { CustomInputProperties } from "../types";

export const Email: React.FC<
  CustomInputProperties & { readOnly?: boolean }
> = ({
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
      render={({ field }) => (
        <Input
          name={field.name}
          label={label}
          placeholder={placeholder}
          type="email"
          value={field.value}
          errorMessage={error?.message}
          onChange={field.onChange}
          hasError={submitcount > 0 ? checkInvalidState() : undefined}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
    />
  );
};

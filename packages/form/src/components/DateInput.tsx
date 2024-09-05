import { IInputProperties, Input } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProperties extends IInputProperties {
  disabled?: boolean;
  label?: string;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
}

export const DateInput: React.FC<IProperties> = ({
  disabled = false,
  label = "",
  name,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
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
          {...others}
          className="dz-date-input"
          defaultValue={field.value}
          disabled={disabled}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          label={label}
          name={field.name}
          onChange={field.onChange}
          type="date"
        />
      )}
    />
  );
};

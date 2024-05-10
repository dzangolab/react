import { IInputProperties, Input } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Properties extends IInputProperties {
  label: string;
  name: string;
  placeholder?: string;
  submitCount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
}

export const NumberInput = ({
  defaultValue,
  errorMessage,
  hasError,
  label,
  name,
  onChange,
  placeholder,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  type,
  ...others
}: Properties) => {
  const { control, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Input
            label={label}
            name={name}
            placeholder={placeholder}
            type="number"
            defaultValue={typeof field.value !== "number" ? "" : field.value}
            errorMessage={error?.message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.valueAsNumber;
              field.onChange(!isNaN(value) ? value : null);
            }}
            hasError={submitCount > 0 ? checkInvalidState() : undefined}
            {...others}
          />
        );
      }}
    />
  );
};

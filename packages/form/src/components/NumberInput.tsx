import { Input } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
interface Properties {
  defaultValue?: number;
  label: string;
  name: string;
  placeholder?: string;
  submitcount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
}

export const NumberInput = ({
  name,
  label,
  placeholder,
  defaultValue = 0,
  submitcount = 0,
  showInvalidState = true,
  showValidState = true,
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
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Input
            label={label}
            name={name}
            placeholder={placeholder}
            type="number"
            defaultValue={field.value}
            errorMessage={error?.message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              field.onChange(+event.target.value)
            }
            hasError={submitcount > 0 ? checkInvalidState() : undefined}
          />
        );
      }}
    />
  );
};

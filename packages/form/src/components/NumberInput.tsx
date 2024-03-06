import { Input } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Properties {
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
  submitcount = 0,
  showInvalidState = true,
  showValidState = true,
}: Properties) => {
  const { control, getFieldState } = useFormContext();

  const { error } = getFieldState(name);

  const checkInvalidState = (field: number) => {
    if (showInvalidState && !field) return true;
    if (showValidState && field) return false;
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
            defaultValue={field.value || ""}
            errorMessage={error?.message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              field.onChange(+event.target.value)
            }
            hasError={
              submitcount > 0 ? checkInvalidState(field.value) : undefined
            }
          />
        );
      }}
    />
  );
};

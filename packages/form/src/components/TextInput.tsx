import { Input } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextInput {
  label?: string;
  placeholder?: string;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitcount?: number;
}

export const TextInput: React.FC<ITextInput> = ({
  label = "",
  placeholder = "",
  name,
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
          type="text"
          defaultValue={field.value}
          errorMessage={error?.message}
          onChange={field.onChange}
          hasError={submitcount > 0 ? checkInvalidState() : undefined}
        />
      )}
    />
  );
};

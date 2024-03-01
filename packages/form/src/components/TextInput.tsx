import { Input } from "@dzangolab/react-ui";
import React from "react";
import {
  UseFormGetFieldState,
  UseFormRegister,
  Controller,
  useFormContext,
} from "react-hook-form";

interface ITextInput {
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitcount?: number;
  /** @deprecated */
  getFieldState?: UseFormGetFieldState<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** @deprecated */
  register?: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const TextInput: React.FC<ITextInput> = ({
  defaultValue = "",
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
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          name={field.name}
          label={label}
          placeholder={placeholder}
          defaultValue={field.value}
          type="text"
          errorMessage={error?.message}
          onChange={field.onChange}
          hasError={submitcount > 0 ? checkInvalidState() : undefined}
        />
      )}
    />
  );
};

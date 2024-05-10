import { IInputProperties, Input } from "@dzangolab/react-ui";
import React from "react";
import {
  UseFormGetFieldState,
  UseFormRegister,
  Controller,
  useFormContext,
} from "react-hook-form";

interface IProperties extends IInputProperties {
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
  /** @deprecated */
  getFieldState?: UseFormGetFieldState<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** @deprecated */
  register?: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const Email: React.FC<IProperties> = ({
  defaultValue = "",
  disabled = false,
  errorMessage,
  hasError,
  label = "",
  name,
  onChange,
  placeholder = "",
  readOnly = false,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  type,
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
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          defaultValue={field.value}
          disabled={disabled}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          label={label}
          name={field.name}
          onChange={field.onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          type="email"
          {...others}
        />
      )}
    />
  );
};

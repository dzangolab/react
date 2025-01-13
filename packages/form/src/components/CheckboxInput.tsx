import {
  CheckboxInput as BasicCheckboxInput,
  ICheckboxInputProperties,
} from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ICheckboxInput extends ICheckboxInputProperties {
  disabled?: boolean;
  name: string;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const CheckboxInput: React.FC<ICheckboxInput> = ({
  className,
  disabled,
  label,
  name,
  options,
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
        <BasicCheckboxInput
          name={field.name}
          label={label}
          value={field.value}
          disabled={disabled}
          errorMessage={error?.message}
          onChange={field.onChange}
          options={options}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          {...others}
        />
      )}
    />
  );
};

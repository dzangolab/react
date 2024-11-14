import {
  RadioInput as BasicRadioInput,
  IRadioInputProperties,
} from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IOption {
  label: string;
  value: string;
}
interface IRadioInput extends IRadioInputProperties {
  disabled?: boolean;
  name: string;
  options: IOption[];
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const RadioInput: React.FC<IRadioInput> = ({
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
    <div className="field dz-radio-input" style={{ display: "flex" }}>
      {label}
      {options.map(({ label, value }) => (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <BasicRadioInput
              label={label}
              name={label}
              value={value}
              checked={field.value === value}
              className={className}
              onChange={field.onChange}
              disabled={disabled}
              errorMessage={error?.message}
              hasError={submitCount > 0 ? checkInvalidState() : undefined}
              {...others}
            />
          )}
        />
      ))}
    </div>
  );
};

import { Select as BasicSelect } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Value = string | number;

type Option = {
  value: Value;
  label: string;
  disabled?: boolean;
};

interface ISelect {
  disabled?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: Option[];
  placeholder?: string;
  submitCount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  renderOption?: (option: Option) => React.ReactNode;
  renderValue?: (
    value?: Value | Value[],
    options?: Option[],
  ) => React.ReactNode;
}

export const Select: React.FC<ISelect> = ({
  disabled,
  label = "",
  multiple = false,
  name,
  options,
  placeholder,
  submitCount = 0,
  showInvalidState = true,
  showValidState = true,
  renderOption,
  renderValue,
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
      defaultValue={multiple ? [] : undefined}
      render={({ field }) => (
        <BasicSelect
          label={label}
          name={name}
          multiple={multiple}
          disabled={disabled}
          options={options}
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
          renderOption={renderOption}
          renderValue={renderValue}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          errorMessage={error?.message}
        />
      )}
    />
  );
};

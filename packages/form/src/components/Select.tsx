import { Select as BasicSelect } from "@dzangolab/react-ui";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Value = string | number;

type Option = {
  value: Value;
  label: string;
  disabled?: boolean;
};

interface ISelect {
  autoSelectSingleOption?: boolean;
  className?: string;
  disabled?: boolean;
  helperText?: string;
  hideIfSingleOption?: boolean;
  label?: string | React.ReactNode;
  multiple?: boolean;
  name: string;
  options: Option[];
  placeholder?: string;
  showRemoveSelection?: boolean;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
  renderOption?: (option: Option) => React.ReactNode;
  renderValue?: (
    value?: Value | Value[],
    options?: Option[],
  ) => React.ReactNode;
}

export const Select: React.FC<ISelect> = ({
  autoSelectSingleOption = false,
  className,
  disabled,
  helperText,
  hideIfSingleOption = false,
  label = "",
  multiple = false,
  name,
  options,
  placeholder,
  showRemoveSelection = true,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  renderOption,
  renderValue,
}) => {
  const { control, getFieldState, setValue } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  //TODO [MA 2024-05-31]: remove this redundant useEffect for auto selecting single option
  useEffect(() => {
    if (
      autoSelectSingleOption &&
      !multiple &&
      options.length === 1 &&
      !options[0].disabled
    ) {
      setValue(name, options[0].value);
    }
  }, [options]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : undefined}
      render={({ field }) => (
        <BasicSelect
          showRemoveSelection={showRemoveSelection}
          autoSelectSingleOption={autoSelectSingleOption}
          className={className}
          helperText={helperText}
          hideIfSingleOption={hideIfSingleOption}
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

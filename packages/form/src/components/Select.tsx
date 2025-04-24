import { Select as BasicSelect, ISelectProperties } from "@dzangolab/react-ui";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ISelect<T extends string | number>
  extends Omit<
    ISelectProperties<T>,
    "onChange" | "value" | "hasError" | "errorMessage"
  > {
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
}

export const Select = <T extends string | number>({
  autoSelectSingleOption = false,
  autoSortOptions = true,
  className,
  disabled,
  enableSearch,
  helperText,
  hideIfSingleOption = false,
  label = "",
  multiple = false,
  name,
  options,
  placeholder,
  renderOption,
  renderValue,
  searchPlaceholder,
  showRemoveSelection = true,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
}: ISelect<T>) => {
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
          autoSelectSingleOption={autoSelectSingleOption}
          autoSortOptions={autoSortOptions}
          className={className}
          disabled={disabled}
          enableSearch={enableSearch}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          helperText={helperText}
          hideIfSingleOption={hideIfSingleOption}
          label={label}
          multiple={multiple}
          name={name}
          options={options}
          onChange={field.onChange}
          placeholder={placeholder}
          renderOption={renderOption}
          renderValue={renderValue}
          showRemoveSelection={showRemoveSelection}
          searchPlaceholder={searchPlaceholder}
          value={field.value}
        />
      )}
    />
  );
};

import { Select as BasicSelect, ISelectProperties } from "@dzangolab/react-ui";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ValidationMessages {
  maxSelection?: string;
  minSelection?: string;
}

interface ISelect<T extends string | number>
  extends Omit<
    ISelectProperties<T>,
    "onChange" | "value" | "hasError" | "errorMessage"
  > {
  maxSelection?: number;
  minSelection?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
  validationMessages?: ValidationMessages;
}

export const Select = <T extends string | number>({
  autoSelectSingleOption = false,
  maxSelection,
  minSelection,
  multiple = false,
  name,
  options,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  validationMessages,
  ...others
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
      rules={{
        validate: (value: T[] | T) => {
          if (!multiple || !Array.isArray(value)) return;

          const count = value.length;

          if (minSelection && count < minSelection) {
            return (
              validationMessages?.minSelection ||
              `Please select at least ${minSelection} option(s).`
            );
          }

          if (maxSelection && count > maxSelection) {
            return (
              validationMessages?.maxSelection ||
              `You can select up to ${maxSelection} option(s) only.`
            );
          }

          return true;
        },
      }}
      render={({ field }) => (
        <BasicSelect
          autoSelectSingleOption={autoSelectSingleOption}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          multiple={multiple}
          name={name}
          options={options}
          onChange={field.onChange}
          value={field.value}
          {...others}
        />
      )}
    />
  );
};

import {
  CurrencyPicker as BasicCurrencyPicker,
  CurrencyPickerProperties,
} from "@dzangolab/react-ui";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ValidationMessages {
  maxSelection?: string;
  minSelection?: string;
}

interface ICurrencyPickerProperties<T extends string | number>
  extends Omit<
    CurrencyPickerProperties<T>,
    "onChange" | "value" | "hasError" | "errorMessage"
  > {
  maxSelection?: number;
  minSelection?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
  validationMessages?: ValidationMessages;
}

export const CurrencyPicker = <T extends string | number>({
  autoSelectSingleOption = false,
  maxSelection,
  minSelection,
  multiple = false,
  name,
  currencyOptions,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  validationMessages,
  ...others
}: ICurrencyPickerProperties<T>) => {
  const { control, getFieldState, setValue } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  //TODO [MA 2024-05-31]: remove this redundant useEffect for auto selecting single option
  useEffect(() => {
    if (autoSelectSingleOption && !multiple && currencyOptions.length === 1) {
      setValue(name, currencyOptions[0].value);
    }
  }, [currencyOptions]);

  return (
    <Controller
      control={control}
      defaultValue={multiple ? [] : undefined}
      name={name}
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
        <BasicCurrencyPicker
          autoSelectSingleOption={autoSelectSingleOption}
          currencyOptions={currencyOptions}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          multiple={multiple}
          name={name}
          onChange={field.onChange}
          value={field.value}
          {...others}
        />
      )}
    />
  );
};

import { Select as BasicSelect, ISelectProperties } from "@dzangolab/react-ui";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ISelect<T extends string | number>
  extends Omit<
    ISelectProperties<T>,
    "onChange" | "value" | "hasError" | "errorMessage"
  > {
  minSelection?: number;
  maxSelection?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
}

export const Select = <T extends string | number>({
  autoSelectSingleOption = false,
  minSelection,
  maxSelection,
  multiple = false,
  name,
  options,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
}: ISelect<T>) => {
  const { control, setValue, setError, clearErrors, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  const handleChange = (value: T | T[]) => {
    console.log("value", value)
    const values = multiple ? (value as T[]) : [value as T];


    let errorMessage: string | null = null;

    // Validation logic
   
  if (minSelection && values.length < minSelection) {
    errorMessage = `Please select at least ${minSelection} option(s).`;
  } else if (maxSelection && values.length > maxSelection) {
    errorMessage = `You can select up to ${maxSelection} option(s) only.`;
  }

  if (errorMessage) {
    setError(name, {
      type: "manual",
      message: errorMessage,
    });
  } else {
    clearErrors(name);
  }

  setValue(name, multiple ? values : values[0], { shouldValidate: !errorMessage });
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
  console.log("error", error)
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : undefined}
      render={({ field }) => (
        <BasicSelect
          autoSelectSingleOption={autoSelectSingleOption}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          multiple={multiple}
          name={name}
          options={options}
          onChange={handleChange}
          value={field.value}
          {...others}
        />
      )}
    />
  );
};

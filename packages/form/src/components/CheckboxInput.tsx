import { CheckboxInput as BasicCheckboxInput } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Option<T> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type ICheckboxInputProperties<T> = {
  className?: string;
  direction?: "horizontal" | "vertical";
  disabled?: boolean;
  checked?: boolean;
  errorMessage?: string;
  helperText?: string;
  inputLabel: string;
  label?: string | React.ReactNode;
  name: string;
  options: Option<T>[];
  placeholder?: string;
  renderOption?: (option: Option<T>) => React.ReactNode;
  renderValue?: (value?: T | T[], options?: Option<T>[]) => React.ReactNode;
  value: T[];
};

export const CheckboxInput = <T extends string | number>({
  className,
  disabled,
  label,
  name,
  options,
  checked,
  errorMessage,
  helperText,
  inputLabel,
  value,
  ...others
}: ICheckboxInputProperties<T>) => {
  const { control, getFieldState, setValue } = useFormContext();

  const { error, invalid } = getFieldState(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BasicCheckboxInput
          // direction={"horizontal"}
          inputLabel={""}
          name={field.name}
          label={label}
          // checkedValues={field.value || []}
          // checkedValues={[]}
          value={field.value}
          disabled={disabled}
          errorMessage={error?.message}
          onChange={field.onChange}
          options={options}
          {...others}
        />
      )}
    />
  );
};

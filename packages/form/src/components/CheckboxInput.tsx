import { CheckboxInput as BasicCheckboxInput } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Option<T> = {
  value: T;
  label: string;
};

export type ICheckboxInputProperties<T> = {
  className?: string;
  direction?: "horizontal" | "vertical";
  disabled?: boolean;
  checked?: boolean;
  helperText?: string;
  inputLabel?: string;
  label?: string | React.ReactNode;
  name: string;
  options: Option<T>[];
  placeholder?: string;
};

export const CheckboxInput = <T extends string | number>({
  className,
  direction,
  disabled,
  label,
  name,
  options,
  checked,
  helperText,
  inputLabel,
}: ICheckboxInputProperties<T>) => {
  const { control, getFieldState } = useFormContext();

  const { error } = getFieldState(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <BasicCheckboxInput
          checked={checked}
          className={className}
          direction={direction}
          disabled={disabled}
          errorMessage={error?.message}
          helperText={helperText}
          inputLabel={inputLabel}
          label={label}
          name={field.name}
          onChange={field.onChange}
          options={options}
          value={field.value}
        />
      )}
    />
  );
};

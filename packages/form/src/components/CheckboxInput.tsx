import {
  CheckboxInput as BasicCheckboxInput,
  ICheckboxInputProperties,
} from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

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
  ...others
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
          {...others}
        />
      )}
    />
  );
};

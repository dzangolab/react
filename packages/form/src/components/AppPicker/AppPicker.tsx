import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { AppPickerBasic } from "./AppPickerBasic";

export interface App {
  name: string;
  id: number;
  origin: string;
}

export interface IProperties {
  name: string;
  label?: string;
  placeholder?: string;
  options: App[] | undefined;
}

export const AppPicker = ({
  name,
  placeholder,
  options = [],
  label,
}: IProperties) => {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState(name);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <AppPickerBasic
            name={field.name}
            value={field.value}
            label={label}
            placeholder={placeholder}
            options={options}
            inputRef={field.ref}
            onChange={(app) => field.onChange(app)}
            error={error}
          />
        )}
      />
    </>
  );
};

import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { AppPickerBasic } from "./AppPickerBasic";

import type { RoleOption } from "../RolePicker";

export interface App {
  id: number;
  name: string;
  origin: string;
  supportedRoles?: RoleOption[];
}

export interface IProperties {
  label?: string;
  name: string;
  options: App[];
  placeholder?: string;
}

/**
 * @deprecated
 */
export const AppPicker = ({
  label,
  name,
  options,
  placeholder,
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

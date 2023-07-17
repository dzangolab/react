import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { RolePickerBasic } from "./RolePickerBasic";
import { ErrorMessage } from "../ErrorMessage";

interface Role {
  name: string;
  id: number;
}

interface IProperties {
  name: string;
  label?: string;
  placeholder?: string;
  options: Role[];
}

export const RolePicker = ({
  name,
  placeholder,
  options,
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
          <RolePickerBasic
            name={field.name}
            value={field.value}
            label={label}
            placeholder={placeholder}
            options={options}
            inputRef={field.ref}
            onChange={(role) => field.onChange(role)}
          />
        )}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </>
  );
};

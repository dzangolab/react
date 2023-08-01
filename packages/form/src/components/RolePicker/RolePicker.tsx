import React, { useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { RolePickerBasic } from "./RolePickerBasic";

import type { App } from "../AppPicker";

export interface Role {
  name: string;
  id: number;
}

interface IProperties {
  name: string;
  label?: string;
  placeholder?: string;
  options: Role[];
  filterRoles?: (apps: App, role: Role[]) => Role[];
}

export const RolePicker = ({
  name,
  placeholder,
  options,
  label,
  filterRoles,
}: IProperties) => {
  const { control, getFieldState } = useFormContext();

  const app = useWatch({
    control,
    name: "app",
  });

  const filteredRoles = useMemo(() => {
    if (filterRoles) {
      return filterRoles(app, options);
    }

    return options;
  }, [app, filterRoles]);

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
            options={filteredRoles}
            inputRef={field.ref}
            onChange={(role) => field.onChange(role)}
            error={error}
          />
        )}
      />
    </>
  );
};

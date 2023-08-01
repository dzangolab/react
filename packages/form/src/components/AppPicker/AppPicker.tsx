import React, { useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { AppPickerBasic } from "./AppPickerBasic";
import type { Role } from "../RolePicker";

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
  filterApps?: (apps: App[], role: Role) => App[];
}

export const AppPicker = ({
  name,
  placeholder,
  options = [],
  label,
  filterApps,
}: IProperties) => {
  const { control, getFieldState } = useFormContext();

  const role = useWatch({
    control,
    name: "role",
  });

  const { error } = getFieldState(name);

  const filteredApps = useMemo(() => {
    if (filterApps) {
      return filterApps(options, role);
    }

    return options;
  }, [role, filterApps]);

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
            options={filteredApps}
            inputRef={field.ref}
            onChange={(app) => field.onChange(app)}
            error={error}
          />
        )}
      />
    </>
  );
};

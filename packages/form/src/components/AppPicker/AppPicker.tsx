import React from "react";

import { Select } from "../Select";

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

export const AppPicker = ({
  label,
  name,
  options,
  placeholder,
}: IProperties) => {
  const filteredOptions = options.map((option) => {
    return {
      label: option.name,
      value: option.id,
    };
  });

  return (
    <Select
      name={name}
      options={filteredOptions}
      label={label}
      placeholder={placeholder}
    />
  );
};

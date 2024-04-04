import { Select as BasicSelect } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ISelect {
  label?: string;
  multiple?: boolean;
  name: string;
  options: {
    value: number | string;
    label: string;
    disabled?: boolean;
  }[];
  placeholder?: string;
}

export const Select: React.FC<ISelect> = ({
  label = "",
  multiple,
  name,
  options,
  placeholder,
}) => {
  const { control, getFieldState } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <BasicSelect
            label={label}
            name={name}
            multiple={multiple}
            options={options}
            placeholder={placeholder}
            value={field.value ? field.value : []}
            onChange={field.onChange}
          />
        );
      }}
    />
  );
};

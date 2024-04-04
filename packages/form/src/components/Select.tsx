import { Select as BasicSelect } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

interface ISelect {
  disabled?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: Option[];
  placeholder?: string;
  renderOption?: (option: Option) => React.ReactNode;
  renderValue?: (
    selectedOption: { value: string | number; label: string }[],
  ) => React.ReactNode;
}

export const Select: React.FC<ISelect> = ({
  disabled,
  label = "",
  multiple,
  name,
  options,
  placeholder,
  renderOption,
  renderValue,
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
            disabled={disabled}
            options={options}
            placeholder={placeholder}
            value={field.value ? field.value : []}
            onChange={field.onChange}
            renderOption={renderOption}
            renderValue={renderValue}
          />
        );
      }}
    />
  );
};

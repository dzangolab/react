import { Typeahead as BasicTypeahead } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITypeahead {
  data: string[];
  disabled?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  submitCount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  onSearch?: (value?: string) => void;
}

export const Typeahead: React.FC<ITypeahead> = ({
  data,
  disabled,
  label = "",
  name,
  placeholder,
  submitCount = 0,
  showInvalidState = true,
  showValidState = true,
  onSearch,
}) => {
  const { control, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => {
        return (
          <BasicTypeahead
            label={label}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            data={data}
            onChange={field.onChange}
            value={field.value}
            hasError={submitCount > 0 ? checkInvalidState() : undefined}
            errorMessage={error?.message}
            onSearch={onSearch}
          />
        );
      }}
    />
  );
};

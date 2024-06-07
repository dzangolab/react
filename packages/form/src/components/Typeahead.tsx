import { Typeahead as BasicTypeahead } from "@dzangolab/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITypeahead<T extends string | number> {
  data: T[];
  debounceTime?: number;
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  name: string;
  placeholder?: string;
  submitCount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  onSearch?: (value?: T) => void;
}

export const Typeahead = <T extends string | number>({
  data,
  debounceTime,
  disabled,
  label = "",
  loading,
  name,
  placeholder,
  submitCount = 0,
  showInvalidState = true,
  showValidState = true,
  onSearch,
}: ITypeahead<T>) => {
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
            loading={loading}
            debounceTime={debounceTime}
            hasError={submitCount > 0 ? checkInvalidState() : undefined}
            errorMessage={error?.message}
            onSearch={onSearch}
          />
        );
      }}
    />
  );
};

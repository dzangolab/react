import { Typeahead as BasicTypeahead } from "@dzangolab/react-ui";
import React, { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Suggestion = string | number | { value: string; label: string };

interface IProperties<T> extends InputHTMLAttributes<HTMLInputElement> {
  data: T[];
  debounceTime?: number;
  label?: string;
  loading?: boolean;
  name: string;
  submitCount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  onSearch?: (value: string | number | readonly string[]) => void;
  renderSuggestion?: (value?: T) => React.ReactNode;
}

export const Typeahead = <T extends Suggestion>({
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
  renderSuggestion,
}: IProperties<T>) => {
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
            renderSuggestion={renderSuggestion}
          />
        );
      }}
    />
  );
};

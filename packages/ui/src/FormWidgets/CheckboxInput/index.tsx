import { useEffect, useState } from "react";

import { Checkbox } from "../Checkbox";

interface Option<T> {
  value: T;
  label: string;
}

export interface ICheckboxInputProperties<T> {
  checked?: boolean;
  className?: string;
  direction?: "horizontal" | "vertical";
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
  inputLabel: string;
  label?: string | React.ReactNode;
  name: string;
  onChange: (newValue: T[]) => void;
  options: Option<T>[];
  placeholder?: string;
  renderOption?: (option: Option<T>) => React.ReactNode;
  renderValue?: (value?: T | T[], options?: Option<T>[]) => React.ReactNode;
  value: T[];
}

export const CheckboxInput = <T extends string | number>({
  checked,
  className,
  disabled,
  direction,
  errorMessage,
  helperText,
  inputLabel,
  label,
  name,
  onChange,
  options,
  value,
}: ICheckboxInputProperties<T>) => {
  const [selectedValues, setSelectedValues] = useState<T[]>([]);
  const hasOptions = Array.isArray(options) && options.length > 0;

  useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues]);

  const isOptionChecked = (value: string | number) => {
    return (
      Array.isArray(selectedValues) &&
      (selectedValues as (string | number)[]).includes(value)
    );
  };

  const handleSelectOption = (option: T) => {
    const newValue = selectedValues.includes(option)
      ? selectedValues.filter((_value) => _value !== option)
      : [...selectedValues, option];

    setSelectedValues(newValue);
  };

  return (
    <fieldset className={`field checkbox ${className}`.trim()}>
      <legend>{label}</legend>
      {hasOptions ? (
        <div className="checkbox-group">
          {options?.map(({ label: optionLabel, value: optionValue }) => (
            <Checkbox
              key={optionValue}
              disabled={disabled}
              label={optionLabel}
              checked={isOptionChecked(optionValue)}
              value={optionValue}
              name={optionLabel}
              onChange={() => handleSelectOption(optionValue)}
            />
          ))}
        </div>
      ) : (
        <div className="single-checkbox">
          <Checkbox
            disabled={disabled}
            label={inputLabel}
            checked={checked}
            name={name}
            onChange={() => {}}
          />
        </div>
      )}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </fieldset>
  );
};

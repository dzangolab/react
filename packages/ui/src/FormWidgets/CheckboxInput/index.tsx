import React from "react";

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
  inputLabel?: string | React.ReactNode;
  label?: string | React.ReactNode;
  name: string;
  onChange?: (newValue: T[] | boolean) => void;
  renderOptionsLabel?: (option: Option<T>) => React.ReactNode;
  options?: Option<T>[];
  placeholder?: string;
  value?: T[];
}

export const CheckboxInput = <T extends string | number>({
  checked = false,
  className = "",
  disabled,
  direction = "vertical",
  errorMessage,
  helperText,
  inputLabel,
  label,
  name,
  onChange,
  options = [],
  value = [],
  renderOptionsLabel,
}: ICheckboxInputProperties<T>) => {
  const hasOptions = Array.isArray(options) && options.length > 0;

  const isOptionChecked = (optionValue: T) => value?.includes(optionValue);

  const handleSelectOption = (option: T) => {
    if (!onChange) {
      return;
    }

    const newValue = value?.includes(option)
      ? value.filter((value_) => value_ !== option)
      : [...value, option];

    onChange(newValue);
  };

  const handleSingleCheckboxChange = () => {
    if (!onChange) {
      return;
    }

    onChange(!checked);
  };

  return (
    <fieldset className={`field checkbox ${className}`.trim()}>
      {label && <legend>{label}</legend>}

      {hasOptions ? (
        <div className={`checkbox-group direction-${direction}`}>
          {options.map((option, index) => (
            <Checkbox
              key={option.value}
              disabled={disabled}
              label={
                renderOptionsLabel ? renderOptionsLabel(option) : option.label
              }
              checked={isOptionChecked(option.value)}
              value={option.value}
              name={`${name}-${index}`}
              onChange={() => handleSelectOption(option.value)}
            />
          ))}
        </div>
      ) : (
        <Checkbox
          disabled={disabled}
          label={inputLabel}
          checked={checked}
          name={name}
          onChange={handleSingleCheckboxChange}
        />
      )}

      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </fieldset>
  );
};

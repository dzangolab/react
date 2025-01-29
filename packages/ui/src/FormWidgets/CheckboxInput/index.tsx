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
  inputLabel?: string;
  label?: string | React.ReactNode;
  name: string;
  onChange?: (newValue: T[] | boolean) => void;
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
}: ICheckboxInputProperties<T>) => {
  const [selectedValues, setSelectedValues] = useState<T[]>(value);
  const [singleChecked, setSingleChecked] = useState<boolean>(checked);

  const hasOptions = Array.isArray(options) && options.length > 0;

  useEffect(() => {
    if (!onChange) {
      return;
    }

    if (hasOptions) {
      onChange(selectedValues);
    } else {
      onChange(singleChecked);
    }
  }, [selectedValues, singleChecked]);

  const isOptionChecked = (optionValue: T) =>
    selectedValues.includes(optionValue);

  const handleSelectOption = (option: T) => {
    const newValue = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    setSelectedValues(newValue);
  };

  const handleSingleCheckboxChange = () => {
    setSingleChecked(!singleChecked);
  };

  return (
    <fieldset className={`field checkbox ${className}`.trim()}>
      {label && <legend>{label}</legend>}
      {hasOptions ? (
        <div className={`checkbox-group direction-${direction}`}>
          {options.map(({ label: optionLabel, value: optionValue }, index) => (
            <Checkbox
              key={optionValue}
              disabled={disabled}
              label={optionLabel}
              checked={isOptionChecked(optionValue)}
              value={optionValue}
              name={`${name}-${index}`}
              onChange={() => handleSelectOption(optionValue)}
            />
          ))}
        </div>
      ) : (
        <div className="single-checkbox">
          <Checkbox
            disabled={disabled}
            label={inputLabel}
            checked={singleChecked}
            name={name}
            onChange={handleSingleCheckboxChange}
          />
        </div>
      )}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </fieldset>
  );
};

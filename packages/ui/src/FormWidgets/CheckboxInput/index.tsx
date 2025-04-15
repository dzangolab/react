import { Checkbox } from "../Checkbox";

interface Option<T> {
  value: T;
  label: string;
}

export interface ICheckboxInputProperties<T> {
  checked?: boolean; // for single checkbox mode
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
  value?: T[]; // for multi-checkbox mode
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

  const selectedValues = value ?? [];
  const singleChecked = checked ?? false;

  const isOptionChecked = (optionValue: T) =>
    selectedValues.includes(optionValue);

  const handleSelectOption = (option: T) => {
    const newValue = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];

    onChange?.(newValue);
  };

  const handleSingleCheckboxChange = () => {
    onChange?.(!singleChecked);
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

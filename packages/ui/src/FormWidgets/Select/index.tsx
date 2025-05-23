import React, { useEffect, useMemo, useRef, useState } from "react";

import { Checkbox } from "../Checkbox";
import { DebouncedInput } from "../DebouncedInput";

type Option<T> = {
  disabled?: boolean;
  label: string;
  value: T;
};

export type ISelectProperties<T> = {
  autoSelectSingleOption?: boolean;
  autoSortOptions?: boolean;
  className?: string;
  disabled?: boolean;
  enableSearch?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  hideIfSingleOption?: boolean;
  label?: string | React.ReactNode;
  multiple?: boolean;
  name: string;
  options: Option<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  showRemoveSelection?: boolean;
  renderOption?: (option: Option<T>) => React.ReactNode;
  renderValue?: (value?: T | T[], options?: Option<T>[]) => React.ReactNode;
} & (
  | {
      multiple: true;
      value: T[];
      onChange: (newValue: T[]) => void;
    }
  | {
      multiple?: false;
      value: T;
      onChange: (newValue: T) => void;
    }
);

export const Select = <T extends string | number>({
  autoSelectSingleOption = false,
  autoSortOptions = true,
  className = "",
  disabled: selectFieldDisabled,
  enableSearch = false,
  errorMessage,
  hasError,
  helperText,
  hideIfSingleOption = false,
  label = "",
  multiple,
  name,
  options,
  placeholder,
  searchPlaceholder,
  showRemoveSelection = true,
  value,
  renderOption,
  renderValue,
  onChange,
}: ISelectProperties<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null,
  );
  const selectReference = useRef<HTMLDivElement>(null);

  const sortedOptions = useMemo(() => {
    return !autoSortOptions
      ? options
      : options.sort((a, b) => a.label.localeCompare(b.label));
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!searchInput) return sortedOptions;

    return sortedOptions.filter((option) =>
      option.label.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [searchInput, sortedOptions]);

  const shouldAutoSelect = useMemo(() => {
    return (
      autoSelectSingleOption &&
      !multiple &&
      options.length === 1 &&
      !options[0].disabled
    );
  }, [options, multiple, autoSelectSingleOption]);

  const shouldHideSelect = useMemo(() => {
    return hideIfSingleOption && !multiple && options.length === 1;
  }, [options, multiple, hideIfSingleOption]);

  const disabled = shouldAutoSelect || selectFieldDisabled;

  useEffect(() => {
    if (shouldAutoSelect || shouldHideSelect) {
      handleSelectedOption(options[0].value);
    }
  }, [options]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        selectReference.current &&
        !selectReference.current.contains(event.target as HTMLElement)
      ) {
        setShowOptions(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selectReference]);

  const getNextFocusableIndex = (current: number | null, direction: 1 | -1) => {
    console.log("current", current);
    if (!filteredOptions.length) return null;
    let index = current ?? (direction === 1 ? 0 : filteredOptions.length - 1);
    let attempts = 0;

    while (attempts < filteredOptions.length) {
      index =
        (index + direction + filteredOptions.length) % filteredOptions.length;
      if (!filteredOptions[index].disabled) return index;
      attempts++;
    }
    return null;
  };

  const handleSelectedOption = (option: T) => {
    if (multiple) {
      const newValue = value.includes(option)
        ? value.filter((_value) => _value !== option)
        : [...value, option];

      onChange(newValue);
    } else {
      onChange(option);
    }
  };

  const handleRemoveOption = (
    option: T | T[] | undefined,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();

    if (multiple) {
      onChange([]);
    } else {
      onChange(null as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    setShowOptions(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!showOptions) {
          setShowOptions(true);
          setFocused(true);
        } else if (focusedOptionIndex !== null) {
          handleSelectedOption(filteredOptions[focusedOptionIndex].value);
        }
        break;

      case "ArrowDown":
        event.preventDefault();
        setFocusedOptionIndex((previous) => getNextFocusableIndex(previous, 1));
        break;

      case "ArrowUp":
        event.preventDefault();
        setFocusedOptionIndex((previous) =>
          getNextFocusableIndex(previous, -1),
        );
        break;

      case "Escape":
        event.preventDefault();
        setShowOptions(false);
        setFocused(false);
        break;
    }
  };

  const hasValue = useMemo(() => {
    if ((multiple && !value.length) || !value) {
      return false;
    }

    return true;
  }, [value]);

  const renderOptions = () => {
    return (
      <ul role="listbox">
        {enableSearch && (
          <DebouncedInput
            placeholder={searchPlaceholder}
            onInputChange={(value_) => setSearchInput(value_ as string)}
          />
        )}
        {filteredOptions.map((option, index) => {
          const isSelected = multiple
            ? value.includes(option.value)
            : value === option.value;

          return (
            <li
              id={`option-${index}`}
              key={index}
              role="option"
              aria-selected={isSelected}
              className={`
              ${isSelected ? "selected" : ""}
              ${option.disabled ? "disabled" : ""}
              ${index === focusedOptionIndex ? "focused" : ""}
            `.trim()}
            >
              {multiple ? (
                <Checkbox
                  name={option.label}
                  checked={value.includes(option.value)}
                  onChange={() => handleSelectedOption(option.value)}
                  disabled={option.disabled}
                />
              ) : null}
              <span
                onClick={() => {
                  if (!disabled) {
                    handleSelectedOption(option.value);
                  }

                  if (!multiple && !disabled) {
                    setShowOptions(false);
                  }
                }}
              >
                {renderOption ? renderOption(option) : label}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSelect = () => {
    const renderSelectValue = () => {
      if (renderValue) {
        return renderValue(value, options);
      }

      const selectedOption = options.find((opt) => opt.value === value);

      return multiple ? (
        <>
          <div className="selected-options">
            {value
              .map(
                (_value) => options.find((opt) => opt.value === _value)?.label,
              )
              .filter((label) => label !== undefined)
              .join(", ")}
          </div>
          {!disabled && showRemoveSelection && (
            <i
              className="pi pi-times"
              onClick={(event) => handleRemoveOption(value, event)}
            ></i>
          )}
        </>
      ) : (
        <>
          <span className="selected-option">{selectedOption?.label}</span>
          {selectedOption && !disabled && showRemoveSelection && (
            <i
              className="pi pi-times"
              onClick={(event) => handleRemoveOption(undefined, event)}
            ></i>
          )}
        </>
      );
    };

    return (
      <div
        className={`label-container ${disabled ? "disabled" : ""} ${
          focused ? "focused" : ""
        }`.trimEnd()}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={showOptions}
        aria-activedescendant={
          focusedOptionIndex !== null
            ? `option-${focusedOptionIndex}`
            : undefined
        }
        aria-invalid={hasError}
        tabIndex={0}
        onClick={() => {
          if (!disabled) {
            setShowOptions(!showOptions);
            setFocused(true);
          }
        }}
        onKeyDown={handleKeyDown}
      >
        {hasValue
          ? renderSelectValue()
          : placeholder && <span className="placeholder">{placeholder}</span>}
        <span className="menu-trigger">
          <i className="pi pi-chevron-down" />
        </span>
      </div>
    );
  };

  if (shouldHideSelect) {
    return null;
  }

  return (
    <div ref={selectReference} className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="select" aria-multiselectable={multiple}>
        {renderSelect()}
        {shouldAutoSelect ? null : showOptions && renderOptions()}
      </div>

      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

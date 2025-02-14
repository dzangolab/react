import React, { useEffect, useMemo, useRef, useState } from "react";

import { Tag } from "../../Tag";
import { Checkbox } from "../Checkbox";
import { DebouncedInput } from "../DebouncedInput";

type Option<T> = {
  disabled?: boolean;
  label: string;
  value: T;
};

type ISelectProperties<T> = {
  autoSelectSingleOption?: boolean;
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
  value,
  renderOption,
  renderValue,
  onChange,
}: ISelectProperties<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [focused, setFocused] = useState(false);

  const selectReference = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchInput) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [searchInput, options]);

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
    option: T | undefined,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();

    if (multiple) {
      const updatedOptions = value.filter((_value) => _value !== option);

      onChange(updatedOptions);

      if (updatedOptions.length === 0) {
        setShowOptions(false);
      }
    } else {
      onChange(option as T);
      setShowOptions(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !disabled) {
      setShowOptions(true);
      setFocused(true);
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
      <ul>
        {enableSearch ? (
          <DebouncedInput
            placeholder={searchPlaceholder}
            onInputChange={(debouncedValue) => {
              setSearchInput(debouncedValue as string);
            }}
          />
        ) : null}

        {filteredOptions?.map((option, index) => {
          const { disabled, label } = option;

          return (
            <li
              key={index}
              className={
                `${!multiple && value === option.value ? "selected" : ""} ${
                  disabled ? "disabled" : ""
                }`.trim() || undefined
              }
            >
              {multiple ? (
                <Checkbox
                  name={label}
                  checked={value.includes(option.value)}
                  onChange={() => handleSelectedOption(option.value)}
                  disabled={disabled}
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
        <div className="selected-options">
          {value.map((_value, index) => {
            const option = options.find((opt) => opt.value === _value);
            if (!option) return null;

            return (
              <Tag
                key={index}
                renderContent={() => (
                  <>
                    <span>{option.label}</span>
                    {!disabled && (
                      <i
                        className="pi pi-times"
                        onClick={(event) =>
                          handleRemoveOption(option.value, event)
                        }
                      ></i>
                    )}
                  </>
                )}
                rounded
              />
            );
          })}
        </div>
      ) : (
        <>
          <span>{selectedOption?.label}</span>
          {selectedOption && !disabled && (
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
        aria-invalid={hasError}
        onClick={() => {
          if (!disabled) {
            setShowOptions(!showOptions);
            setFocused(true);
          }
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {hasValue
          ? renderSelectValue()
          : placeholder && <span className="placeholder">{placeholder}</span>}
        <span
          className="menu-trigger"
          onClick={() => {
            if (!disabled) {
              setShowOptions(!showOptions);
              setFocused(true);
            }
          }}
        >
          <i className="pi pi-chevron-down"></i>
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

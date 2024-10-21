import React, { useEffect, useMemo, useRef, useState } from "react";

import { Tag } from "../../Tag";
import { Checkbox } from "../Checkbox";

type Option<T> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type ISelectProperties<T> = {
  autoSelectSingleOption?: boolean;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  name: string;
  options: Option<T>[];
  placeholder?: string;
  renderOption?: (option: Option<T>) => React.ReactNode;
  renderValue?: (value?: T | T[], options?: Option<T>[]) => React.ReactNode;
} & (
  | {
      multiple: true;
      value: T[];
      onChange: (newValue: T[]) => void;
    }
  | {
      multiple: false;
      value: T;
      onChange: (newValue: T) => void;
    }
);

export const Select = <T extends string | number>({
  autoSelectSingleOption = false,
  className,
  disabled: selectFieldDisabled,
  errorMessage,
  hasError,
  label = "",
  multiple,
  name,
  options,
  placeholder,
  value,
  renderOption,
  renderValue,
  onChange,
}: ISelectProperties<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectReference = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const shouldAutoSelect = useMemo(() => {
    return (
      autoSelectSingleOption &&
      !multiple &&
      options.length === 1 &&
      !options[0].disabled
    );
  }, [options, multiple, autoSelectSingleOption]);

  const disabled = selectFieldDisabled ?? shouldAutoSelect;

  useEffect(() => {
    if (shouldAutoSelect) {
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
      <ul className="select-field-options" aria-multiselectable={multiple}>
        {options?.map((option, index) => {
          const { disabled, label } = option;
          let isChecked = false;

          multiple &&
            value.forEach((_value) => {
              if (_value === option.value) {
                isChecked = true;
              }
            });

          return (
            <li
              key={index}
              className={`option ${
                !disabled && value === option.value ? "selected" : ""
              }`.trimEnd()}
            >
              {multiple ? (
                <Checkbox
                  name={label}
                  checked={isChecked}
                  onChange={() => handleSelectedOption(option.value)}
                  disabled={disabled}
                />
              ) : null}
              <span
                onClick={() => {
                  if (!disabled) {
                    handleSelectedOption(option.value);
                  }

                  if (!multiple) {
                    setShowOptions(false);
                  }
                }}
                className={disabled ? "disabled" : ""}
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

      return (
        <>
          {multiple ? (
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
          )}
        </>
      );
    };

    return (
      <div
        className={`input-field-select ${disabled ? "disabled" : ""} ${
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
          : placeholder && (
              <span className="select-field-placeholder">{placeholder}</span>
            )}
        <span
          className="select-menu-toggle"
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

  return (
    <div ref={selectReference} className={`dz-select ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      {renderSelect()}
      {shouldAutoSelect ? null : showOptions && renderOptions()}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

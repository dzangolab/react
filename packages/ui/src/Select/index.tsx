import React, { useEffect, useRef, useState } from "react";

import { Tag, Checkbox } from "..";

type Option<T> = {
  value: T;
  label: string;
  disabled?: boolean;
};

interface ISelectProperties<T> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: Option<T>[];
  placeholder?: string;
  value: T[];
  onChange: (newValue: T[]) => void;
  renderOption?: (option: Option<T>) => React.ReactNode;
  renderValue?: (selectedValues: string[]) => React.ReactNode;
}

export const Select = <T extends string | number>({
  disabled,
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
    let newValue: T[];
    if (!multiple) {
      newValue = [option];
    } else {
      newValue = value.includes(option)
        ? value.filter((_value) => _value !== option)
        : [...value, option];
    }
    onChange(newValue);
  };

  const handleRemoveOption = (option: T, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedOptions = value.filter((_value) => _value !== option);
    onChange(updatedOptions);

    if (updatedOptions.length === 0) {
      setShowOptions(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !disabled) {
      setShowOptions(true);
      setFocused(true);
    }
  };

  const renderOptions = () => {
    return (
      <div className="select-field-options">
        {options?.map((option, index) => {
          const { disabled, label } = option;
          let isChecked = false;
          value.forEach((_value) => {
            if (_value === option.value) {
              isChecked = true;
            }
          });

          return (
            <div key={index} className="option">
              {multiple ? (
                <Checkbox
                  name={label}
                  checked={isChecked}
                  onChange={() => handleSelectedOption(option.value)}
                  disabled={disabled}
                />
              ) : null}
              <span
                onClick={() => !disabled && handleSelectedOption(option.value)}
                className={disabled ? "disabled" : ""}
              >
                {renderOption ? renderOption(option) : label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelect = () => {
    const renderSelectValue = () => {
      if (renderValue) {
        const selectedLabels = value.map((_value) => {
          const option = options.find((opt) => opt.value === _value);

          return option ? option.label : "";
        });

        return renderValue(selectedLabels);
      }

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
                        <i
                          className="pi pi-times"
                          onClick={(event) =>
                            handleRemoveOption(option.value, event)
                          }
                        ></i>
                      </>
                    )}
                    rounded
                  />
                );
              })}
            </div>
          ) : (
            <span>{options.find((opt) => opt.value === value[0])?.label}</span>
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
        {value.length > 0
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
    <div ref={selectReference} className={`dz-select ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      {renderSelect()}
      {showOptions && renderOptions()}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

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
  renderValue?: (
    selectedOption: { value: T; label: string }[],
  ) => React.ReactNode;
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
  const [selectedOptions, setSelectedOptions] = useState<
    { value: T; label: string }[]
  >([]);
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

  const handleSelectedOption = (option: { value: T; label: string }) => {
    if (!multiple) {
      onChange([option.value]);
      setSelectedOptions([option]);
    } else {
      const newValue = value.includes(option.value)
        ? value.filter((value) => value !== option.value)
        : [...value, option.value];
      onChange(newValue);
      setSelectedOptions(
        newValue.map((value) => options.find((opt) => opt.value === value)!),
      );
    }
  };

  const handleRemoveOption = (
    option: { value: T; label: string },
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    const updatedOptions = selectedOptions.filter(
      (opt) => opt.value !== option.value,
    );
    onChange(updatedOptions.map((opt) => opt.value));
    setSelectedOptions(updatedOptions);

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
          const { value, label, disabled } = option;
          let isChecked = false;
          selectedOptions.forEach((selected) => {
            if (selected.value === value) {
              isChecked = true;
            }
          });

          return (
            <div key={index} className="option">
              {multiple ? (
                <Checkbox
                  name={label}
                  checked={isChecked}
                  onChange={() => handleSelectedOption(option)}
                  disabled={disabled}
                />
              ) : null}
              <span
                onClick={() => !disabled && handleSelectedOption(option)}
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
    if (renderValue) {
      return renderValue(selectedOptions);
    }

    return (
      <>
        {multiple ? (
          <div className="selected-options">
            {selectedOptions.map((option, index) => (
              <Tag
                key={index}
                renderContent={() => (
                  <>
                    <span>{option.label}</span>
                    <i
                      className="pi pi-times"
                      onClick={(event) => handleRemoveOption(option, event)}
                    ></i>
                  </>
                )}
                rounded
              />
            ))}
          </div>
        ) : (
          <span>{selectedOptions[0].label}</span>
        )}
      </>
    );
  };

  return (
    <div ref={selectReference} className={`dz-select ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
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
        {selectedOptions.length > 0
          ? renderSelect()
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
      {showOptions && renderOptions()}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

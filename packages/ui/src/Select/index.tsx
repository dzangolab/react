import React, { useEffect, useRef, useState } from "react";

import { Tag, Checkbox } from "..";

interface ISelectProperties<T> {
  disabled?: boolean;
  hasError?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: {
    value: T;
    label: string;
    disabled?: boolean;
    renderOption?: (option: T) => React.ReactNode;
  }[];
  value: T[];
  onChange: (newValue: T[]) => void;
}

export const Select = <T extends string | number>({
  disabled,
  hasError,
  label = "",
  multiple,
  name,
  options,
  value,
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
    let newValue: T[];

    if (!multiple) {
      newValue = value[0] === option.value ? [] : [option.value];
    } else {
      newValue = value.includes(option.value)
        ? value.filter((value_) => value_ !== option.value)
        : [...value, option.value];
    }
    onChange(newValue);
    setSelectedOptions(
      newValue.map((value) => options.find((opt) => opt.value === value)!),
    );
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

  const handleClick = () => {
    if (!disabled) {
      setShowOptions(!showOptions);
      setFocused(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !disabled) {
      setShowOptions(true);
      setFocused(true);
    }
  };

  return (
    <div ref={selectReference} className={`dz-select ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}

      <div
        className={`input-field-select ${disabled ? "disabled" : ""} ${
          focused ? "focused" : ""
        }`.trimEnd()}
        aria-invalid={hasError}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {selectedOptions.length > 0 && (
          <>
            {selectedOptions.length > 4 ? (
              <span>{`${selectedOptions.length} items selected`}</span>
            ) : (
              selectedOptions.map((option, index) => (
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
              ))
            )}
          </>
        )}
        <span className="arrow" onClick={handleClick}>
          <i className="pi pi-chevron-down"></i>
        </span>
      </div>
      {showOptions && (
        <div className="select-field-options">
          {options?.map((option, index) => {
            const { value, label, disabled, renderOption } = option;
            let isChecked = false;
            selectedOptions.forEach((selected) => {
              if (selected.value === value) {
                isChecked = true;
              }
            });
            return (
              <React.Fragment key={index}>
                {renderOption ? (
                  renderOption(value)
                ) : (
                  <Checkbox
                    name={label}
                    label={label}
                    checked={isChecked}
                    onChange={() => handleSelectedOption(option)}
                    disabled={disabled}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

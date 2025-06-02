import React, { useEffect, useMemo, useRef, useState } from "react";

import { PopupMenu } from "../../Popup";
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
  const optionReference = useRef<Record<number, HTMLLIElement | null>>({});
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );

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
      const popupMenuContent = document.querySelector(".popup-menu");

      if (
        selectReference.current &&
        !selectReference.current.contains(event.target as HTMLElement) &&
        (!popupMenuContent ||
          !popupMenuContent.contains(event.target as HTMLElement))
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

  useEffect(() => {
    if (
      focusedOptionIndex !== null &&
      optionReference.current[focusedOptionIndex]
    ) {
      optionReference.current[focusedOptionIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedOptionIndex]);

  const nextIndex = (startIndex: number): number => {
    const total = filteredOptions.length;

    let index = (startIndex + 1) % total;
    while (filteredOptions[index]?.disabled && index !== startIndex) {
      index = (index + 1) % total;
    }

    return index;
  };

  const previousIndex = (startIndex: number): number => {
    const total = filteredOptions.length;

    let index = (startIndex - 1 + total) % total;
    while (filteredOptions[index]?.disabled && index !== startIndex) {
      index = (index - 1 + total) % total;
    }

    return index;
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
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    event.stopPropagation();

    if (multiple) {
      onChange([]);
    } else {
      onChange(null as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    setShowOptions(false);
    setFocused(false);
  };

  const handleRemoveOptionKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRemoveOption(undefined, event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    const openDropdown = () => {
      setShowOptions(true);
      setFocused(true);
    };

    const selectFocusedOption = () => {
      if (focusedOptionIndex !== null) {
        handleSelectedOption(filteredOptions[focusedOptionIndex].value);
        if (!multiple) {
          setShowOptions(false);
        }
      } else {
        setShowOptions(false);
      }
    };

    const focusFirstEnabledOption = () => {
      const index = filteredOptions.findIndex((opt) => !opt.disabled);

      if (index !== -1) {
        setFocusedOptionIndex(index);
      }
    };

    const focusLastEnabled = () => {
      for (let i = filteredOptions.length - 1; i >= 0; i--) {
        if (!filteredOptions[i].disabled) {
          setFocusedOptionIndex(i);
          break;
        }
      }
    };

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        showOptions ? selectFocusedOption() : openDropdown();
        break;

      case "ArrowDown":
        event.preventDefault();
        setFocusedOptionIndex((previous) => nextIndex(previous as number));
        break;

      case "ArrowUp":
        event.preventDefault();
        setFocusedOptionIndex((previous) => previousIndex(previous as number));
        break;

      case "Escape":
        event.preventDefault();
        setShowOptions(false);
        break;

      case "Home":
      case "PageUp":
        event.preventDefault();
        focusFirstEnabledOption();
        break;

      case "End":
      case "PageDown":
        event.preventDefault();
        focusLastEnabled();
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
      <ul>
        {enableSearch ? (
          <DebouncedInput
            placeholder={searchPlaceholder}
            onInputChange={(debouncedValue) => {
              setSearchInput(debouncedValue as string);
            }}
            tabIndex={0}
          />
        ) : null}

        {filteredOptions?.map((option, index) => {
          const { disabled, label } = option;

          return (
            <li
              key={index}
              ref={(element) => (optionReference.current[index] = element)}
              className={
                `${!multiple && value === option.value ? "selected" : ""}
              ${disabled ? "disabled" : ""}
              ${index === focusedOptionIndex ? "focused" : ""}
            `.trim() || undefined
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
              tabIndex={0}
              className="pi pi-times"
              onClick={(event) => handleRemoveOption(value, event)}
              onKeyDown={(event) => handleRemoveOptionKeyDown(event)}
            ></i>
          )}
        </>
      ) : (
        <>
          <span className="selected-option">{selectedOption?.label}</span>
          {selectedOption && !disabled && showRemoveSelection && (
            <i
              tabIndex={0}
              className="pi pi-times"
              onClick={(event) => handleRemoveOption(undefined, event)}
              onKeyDown={(event) => handleRemoveOptionKeyDown(event)}
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

      <div
        className="select"
        ref={setReferenceElement}
        aria-multiselectable={multiple}
      >
        {renderSelect()}
        {shouldAutoSelect
          ? null
          : showOptions && (
              <PopupMenu
                className="select-menu"
                content={renderOptions()}
                matchReferenceWidth
                offset={0}
                referenceElement={referenceElement}
              />
            )}
      </div>

      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

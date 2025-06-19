import React, { useEffect, useMemo, useRef, useState } from "react";

import { PopupMenu, PopupMenuProperties } from "../../Popup";
import { Checkbox } from "../Checkbox";
import { DebouncedInput } from "../DebouncedInput";

export type Option<T> = {
  disabled?: boolean;
  label: string;
  value: T;
};

type MenuOptions = Partial<Omit<PopupMenuProperties, "referenceElement">>;

export type ISelectProperties<T> = {
  autoSelectSingleOption?: boolean;
  autoSortOptions?: boolean;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  hideIfSingleOption?: boolean;
  label?: string | React.ReactNode;
  multiple?: boolean;
  name: string;
  options: Option<T>[];
  placeholder?: string;
  menuOptions?: MenuOptions;
  showRemoveSelection?: boolean;
  customSearchFn?: (searchInput: string) => Option<T>[];
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
  errorMessage,
  hasError,
  helperText,
  hideIfSingleOption = false,
  label = "",
  multiple,
  name,
  options,
  placeholder,
  menuOptions,
  showRemoveSelection = true,
  value,
  customSearchFn,
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
  const searchInputReference = useRef<HTMLInputElement>(null);
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
    if (!searchInput) {
      return sortedOptions;
    }

    if (customSearchFn) {
      return customSearchFn(searchInput);
    }

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

  const multiSelectedLabels = useMemo(() => {
    if (!multiple || !value?.length) return "";

    return options
      .filter((opt) => value.includes(opt.value))
      .map((opt) => opt.label)
      .join(", ");
  }, [multiple, value, options]);

  const displayValue = multiple
    ? multiSelectedLabels
    : (options.find((opt) => opt.value === value)?.label ?? "");

  const syncInputWithValue = () => {
    setSearchInput(displayValue);
  };

  useEffect(() => {
    syncInputWithValue();
  }, []);

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
        syncInputWithValue();
        setShowOptions(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selectReference, value, options, multiple]);

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
      searchInputReference.current?.focus();
    } else {
      onChange(option);

      const selectedOption = options.find((opt) => opt.value === option);
      setSearchInput(selectedOption?.label ?? "");
      setFocused(false);
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
    setSearchInput("");
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
      searchInputReference.current?.focus();
    };

    const selectFocusedOption = () => {
      if (focusedOptionIndex !== null) {
        handleSelectedOption(filteredOptions[focusedOptionIndex].value);
        if (!multiple) {
          setShowOptions(false);
          searchInputReference.current?.blur();
          setFocused(false);
        }
      } else {
        setShowOptions(false);
        searchInputReference.current?.blur();
        setFocused(false);
      }

      setFocusedOptionIndex(null);
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
        syncInputWithValue();
        setShowOptions(false);
        searchInputReference.current?.blur();

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

  const renderOptions = () => {
    return (
      <ul aria-multiselectable={multiple} role="listbox">
        {filteredOptions?.map((option, index) => {
          const { disabled, label } = option;

          return (
            <li
              key={index}
              ref={(element) => (optionReference.current[index] = element)}
              role="option"
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

      return (
        <DebouncedInput
          ref={searchInputReference}
          placeholder={placeholder}
          onInputChange={(debouncedValue) => {
            setSearchInput(debouncedValue as string);
          }}
          defaultValue={searchInput}
          tabIndex={-1}
          disabled={disabled}
        />
      );
    };
    return (
      <div
        className={`label-container ${disabled ? "disabled" : ""} ${
          focused ? "focused" : ""
        }`.trimEnd()}
        aria-invalid={hasError}
        onClick={() => {
          if (disabled) return;

          if (showOptions) {
            setSearchInput(displayValue);
            setShowOptions(false);
            setFocused(false);
            searchInputReference.current?.blur();
          } else {
            setSearchInput("");
            setShowOptions(true);
            setFocused(true);
          }
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {renderSelectValue()}
        <span className="action-items">
          {!disabled &&
            showRemoveSelection &&
            searchInput?.trim()?.length > 0 && (
              <i
                className="pi pi-times"
                onClick={(event) => handleRemoveOption(undefined, event)}
                onKeyDown={(event) => handleRemoveOptionKeyDown(event)}
                tabIndex={0}
              ></i>
            )}

          <i
            className="pi pi-chevron-down"
            onClick={() => {
              if (!disabled) {
                setShowOptions(!showOptions);
                setFocused(true);
              }
            }}
          ></i>
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

      <div className="select" ref={setReferenceElement}>
        {renderSelect()}
        {shouldAutoSelect
          ? null
          : showOptions && (
              <PopupMenu
                className={`select-menu ${menuOptions?.className}`.trim()}
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

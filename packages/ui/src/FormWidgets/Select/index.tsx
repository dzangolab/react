import React, { useEffect, useMemo, useRef, useState } from "react";

import Divider from "@/Divider";

import { PopupMenu, PopupMenuProperties } from "../../Popup";
import { Tooltip, TooltipProperties } from "../../Tooltip";
import { Checkbox } from "../Checkbox";
import { DebouncedInput } from "../DebouncedInput";

export type Option<T> = {
  disabled?: boolean;
  label?: string;
  value?: T;
  [key: string]: unknown;
};

type MenuOptions = Partial<Omit<PopupMenuProperties, "referenceElement">>;

type TooltipOptions = Omit<
  TooltipProperties,
  "elementRef" | "children" | "className"
>;

export type ISelectProperties<T> = {
  autoSelectSingleOption?: boolean;
  autoSortOptions?: boolean;
  className?: string;
  disabled?: boolean;
  enableTooltip?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  hideIfSingleOption?: boolean;
  label?: string | React.ReactNode;
  labelKey?: string;
  matchMenuTriggerWidth?: boolean;
  menuOptions?: MenuOptions;
  multiple?: boolean;
  name: string;
  options: Option<T>[];
  placeholder?: string;
  showRemoveSelection?: boolean;
  tooltipOptions?: TooltipOptions;
  valueKey?: string;
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
  enableTooltip = false,
  hasError,
  helperText,
  hideIfSingleOption = false,
  label = "",
  labelKey,
  matchMenuTriggerWidth = true,
  menuOptions,
  multiple,
  name,
  options,
  placeholder,
  showRemoveSelection = true,
  tooltipOptions,
  value,
  valueKey,
  customSearchFn,
  onChange,
  renderOption,
  renderValue,
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

  const menuTooltipReference = useRef<HTMLSpanElement>(null);
  const selectTooltipReference = useRef<HTMLSpanElement>(null);

  const normalizedOptions = useMemo(() => {
    return options.map((option) => {
      const _label =
        labelKey && option[labelKey] !== undefined
          ? String(option[labelKey])
          : option.label;

      const _value =
        valueKey && option[valueKey] !== undefined
          ? (option[valueKey] as T)
          : option.value;

      return {
        ...option,
        label: _label,
        value: _value,
      };
    });
  }, [options, labelKey, valueKey]);

  const sortedOptions = useMemo(() => {
    return !autoSortOptions
      ? normalizedOptions
      : [...normalizedOptions].sort((a, b) =>
          String(a.label).localeCompare(String(b.label)),
        );
  }, [normalizedOptions]);

  const filteredOptions = useMemo(() => {
    if (!searchInput) {
      return sortedOptions;
    }

    if (customSearchFn) {
      return customSearchFn(searchInput);
    }

    return sortedOptions.filter((option) =>
      String(option.label).toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [searchInput, sortedOptions]);

  const activeOptions = useMemo(
    () => filteredOptions.filter((option) => !option.disabled),
    [filteredOptions],
  );

  const isAllSelected = useMemo(() => {
    return (
      multiple &&
      activeOptions.length > 0 &&
      activeOptions.every((option) => value.includes(option.value as T))
    );
  }, [activeOptions, value]);

  const toggleSelectAll = () => {
    if (!multiple) {
      return;
    }

    const selectedValue = isAllSelected
      ? []
      : activeOptions.map((option) => option.value);

    onChange(selectedValue as T[]);
    setTimeout(() => {
      searchInputReference.current?.focus();
    }, 0);
  };

  const shouldAutoSelect = useMemo(() => {
    return (
      autoSelectSingleOption &&
      !multiple &&
      normalizedOptions.length === 1 &&
      !normalizedOptions[0].disabled
    );
  }, [normalizedOptions, multiple, autoSelectSingleOption]);

  const shouldHideSelect = useMemo(() => {
    return hideIfSingleOption && !multiple && normalizedOptions.length === 1;
  }, [normalizedOptions, multiple, hideIfSingleOption]);

  const disabled = shouldAutoSelect || selectFieldDisabled;

  const selectedOptions = useMemo(() => {
    if (multiple) {
      if (!value?.length) return "";

      return normalizedOptions
        .filter((opt) => value.includes(opt.value as T))
        .map((opt) => opt.label)
        .join(", ");
    }

    return normalizedOptions.find((opt) => opt.value === value)?.label ?? "";
  }, [multiple, value, normalizedOptions]);

  useEffect(() => {
    if (shouldAutoSelect || shouldHideSelect) {
      handleSelectedOption(normalizedOptions[0].value as T);
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
      setSearchInput("");

      setTimeout(() => {
        searchInputReference.current?.focus();
      }, 0);
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

    setSearchInput("");
    setFocused(true);
    setTimeout(() => {
      searchInputReference.current?.focus();
    }, 0);
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

      setTimeout(() => {
        searchInputReference.current?.focus();
      }, 0);
    };

    const selectFocusedOption = () => {
      if (focusedOptionIndex !== null) {
        handleSelectedOption(filteredOptions[focusedOptionIndex].value as T);
        if (!multiple) {
          setShowOptions(false);
          searchInputReference.current?.blur();
          setFocused(false);
        }
      } else {
        setShowOptions(false);
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
        setShowOptions(false);
        setFocused(false);
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

  const toggleOptionsMenu = () => {
    if (disabled) return;

    if (showOptions) {
      setShowOptions(false);
      setFocused(false);

      searchInputReference.current?.blur();
    } else {
      setSearchInput("");
      setShowOptions(true);
      setFocused(true);

      setTimeout(() => {
        searchInputReference.current?.focus();
      }, 0);
    }
  };

  const renderOptions = () => {
    const _options = renderValue
      ? renderValue(value, normalizedOptions)
      : selectedOptions;

    const hasSelectedOptions = selectedOptions.trim().length > 0;

    return (
      <>
        <div
          className={`selected-options-wrapper ${hasSelectedOptions ? "visible" : ""}`}
        >
          {enableTooltip && (
            <Tooltip elementRef={menuTooltipReference} {...tooltipOptions}>
              {selectedOptions}
            </Tooltip>
          )}
          <span ref={menuTooltipReference} className="selected-options">
            {_options}
          </span>
          {hasSelectedOptions && <Divider />}
        </div>
        <ul aria-multiselectable={multiple} role="listbox">
          {multiple && (
            <li role="option" onClick={toggleSelectAll}>
              <Checkbox
                checked={isAllSelected}
                disabled={activeOptions.length === 0}
              />
              <span>Select all</span>
            </li>
          )}

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
                onClick={() => {
                  if (!disabled) {
                    handleSelectedOption(option.value as T);
                  }

                  if (!multiple && !disabled) {
                    setShowOptions(false);
                  }
                }}
              >
                {multiple ? (
                  <Checkbox
                    name={label}
                    checked={value.includes(option.value as T)}
                    onChange={() => handleSelectedOption(option.value as T)}
                    disabled={disabled}
                  />
                ) : null}
                <span>{renderOption ? renderOption(option) : label}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const renderSelect = () => {
    const renderSelectValue = () => {
      return (
        <>
          {enableTooltip && (
            <Tooltip elementRef={selectTooltipReference} {...tooltipOptions}>
              {selectedOptions}
            </Tooltip>
          )}

          <span ref={selectTooltipReference} className="selected-options">
            {renderValue
              ? renderValue(value, normalizedOptions)
              : selectedOptions}
          </span>
        </>
      );
    };

    return (
      <div
        className={`label-container ${disabled ? "disabled" : ""} ${focused ? "focused" : ""}`.trimEnd()}
        aria-invalid={hasError}
        onClick={toggleOptionsMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {!selectedOptions.length || showOptions ? (
          <DebouncedInput
            ref={searchInputReference}
            placeholder={placeholder}
            onInputChange={(debouncedValue) => {
              setSearchInput(debouncedValue as string);

              if (debouncedValue && !showOptions) {
                setShowOptions(true);
              }
            }}
            disabled={disabled}
            defaultValue={searchInput}
            tabIndex={-1}
          />
        ) : (
          renderSelectValue()
        )}
        <span className="action-items">
          {!disabled && showRemoveSelection && selectedOptions && (
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
                matchReferenceWidth={matchMenuTriggerWidth}
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

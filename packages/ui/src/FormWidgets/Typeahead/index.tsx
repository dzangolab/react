import { useEffect, useRef, useState } from "react";

import LoadingIcon from "../../LoadingIcon";
import { DebouncedInput } from "../DebouncedInput";
import { IInputProperties } from "../Input";

type Suggestion = string | number | object;

interface SuggestionOption<T> {
  suggestionLabel?: T extends object ? keyof T : undefined;
}

interface IProperties<T>
  extends Omit<IInputProperties, "onChange">,
    SuggestionOption<T> {
  data?: T[];
  debounceTime?: number;
  errorMessage?: string;
  emptyMessage?: string;
  forceSelect?: boolean;
  hasError?: boolean;
  helperText?: string;
  label?: string | React.ReactNode;
  loading?: boolean;
  onSearch?: (value: string | number | readonly string[]) => void;
  onChange?: (value?: T) => void;
  renderSuggestion?: (suggestion: T) => React.ReactNode;
}

export const Typeahead = <T extends Suggestion>({
  className = "",
  data,
  disabled,
  debounceTime = 300,
  value = "",
  errorMessage,
  emptyMessage,
  forceSelect = true,
  hasError,
  helperText,
  label,
  loading,
  name,
  placeholder,
  type = "text",
  onChange,
  onSearch,
  renderSuggestion,
  suggestionLabel,
}: IProperties<T>) => {
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[]
  >(value);
  const isSuggestionSelected = useRef(false);
  const suggestionReference = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      suggestionReference.current &&
      !suggestionReference.current.contains(event.target as HTMLElement)
    ) {
      if (forceSelect) {
        setInputValue("");
      } else {
        setSuggestions([]);
        suggestionReference.current.style.display = "none";
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleSelectedSuggestion = (suggestion: T) => {
    isSuggestionSelected.current = true;

    if (typeof suggestion === "string") {
      setInputValue(suggestion);
    } else if (typeof suggestion === "object" && suggestionLabel) {
      setInputValue(suggestion[suggestionLabel]);
    }

    if (onChange) {
      onChange(suggestion);
    }

    setSuggestions([]);
  };

  const handleInputChange = (value: string | number | readonly string[]) => {
    if (value === inputValue) {
      return;
    }

    if (isSuggestionSelected.current) {
      isSuggestionSelected.current = false;

      onChange && onChange();
    }

    setInputValue(value);

    if (onSearch && value) {
      onSearch(value);
    }
  };

  const renderSuggestions = () => {
    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLLIElement>,
      suggestion: T,
    ) => {
      if (event.key === "Enter" && !disabled) {
        handleSelectedSuggestion(suggestion);
      }
    };

    const renderSuggestionContent = (suggestion: T) => {
      if (renderSuggestion) {
        return renderSuggestion(suggestion);
      }

      if (typeof suggestion === "object" && suggestionLabel) {
        return suggestion[suggestionLabel];
      }

      if (typeof suggestion === "string" || typeof suggestion === "number") {
        return suggestion;
      }

      return null;
    };

    const renderEmptyMessage = () => {
      if (loading) {
        return null;
      }

      return (
        <ul ref={suggestionReference}>
          <li>
            <span role="alert">{emptyMessage}</span>
          </li>
        </ul>
      );
    };

    return (
      <>
        {inputValue &&
          !isSuggestionSelected.current &&
          (suggestions.length > 0 ? (
            <ul ref={suggestionReference}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectedSuggestion(suggestion)}
                  onKeyDown={(event) => handleKeyDown(event, suggestion)}
                  tabIndex={0}
                >
                  {renderSuggestionContent(suggestion)}
                </li>
              ))}
            </ul>
          ) : emptyMessage ? (
            renderEmptyMessage()
          ) : null)}
      </>
    );
  };

  return (
    <div className={`dz-typeahead ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={`input-field-typeahead ${disabled ? "disabled" : ""}`}
        aria-invalid={hasError}
      >
        <DebouncedInput
          type={type}
          defaultValue={inputValue}
          debounceTime={debounceTime}
          onInputChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {loading && <LoadingIcon color="#ccc" />}
      </div>
      {renderSuggestions()}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

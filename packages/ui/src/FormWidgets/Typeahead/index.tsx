import { InputHTMLAttributes, useEffect, useRef, useState } from "react";

import LoadingIcon from "../../LoadingIcon";
import { DebouncedInput } from "../DebouncedInput";

type Suggestion = string | number | { value: string; label: string };

interface IProperties<T>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  data?: T[];
  debounceTime?: number;
  errorMessage?: string;
  emptyMessage?: string;
  hasError?: boolean;
  label?: string;
  loading?: boolean;
  onSearch?: (value: string | number | readonly string[]) => void;
  onChange?: (value: T) => void;
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
  hasError,
  label,
  loading,
  name,
  placeholder,
  type = "text",
  onChange,
  onSearch,
  renderSuggestion,
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
      setInputValue("");
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
    } else if (typeof suggestion === "object" && suggestion.value) {
      setInputValue(suggestion.value);
    }

    if (onChange) {
      onChange(suggestion);
    }

    setSuggestions([]);
  };

  const handleInputChange = (value: string | number | readonly string[]) => {
    if (isSuggestionSelected.current) {
      isSuggestionSelected.current = false;

      return;
    }
    setInputValue(value);

    if (onSearch) {
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

      if (typeof suggestion === "object" && suggestion.label) {
        return suggestion.label;
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
            <ul>
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
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

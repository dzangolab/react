import { useEffect, useRef, useState } from "react";

import LoadingIcon from "../../LoadingIcon";
import { DebouncedInput } from "../DebouncedInput";

type Suggestion = string | number | { value: string; label: string };

interface IProperties<T> {
  className?: string;
  data?: T[];
  disabled?: boolean;
  debounceTime?: number;
  value?: string;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  onSearch?: (value: string | number | readonly string[]) => void;
  onChange?: (value: T) => void;
  renderSuggestion?: (value: T) => React.ReactNode;
}

export const Typeahead = <T extends Suggestion>({
  className = "",
  data,
  disabled,
  debounceTime = 300,
  value = "",
  errorMessage,
  hasError,
  label,
  loading,
  name,
  placeholder,
  onChange,
  onSearch,
  renderSuggestion,
}: IProperties<T>) => {
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[]
  >(value);
  const isSuggestionSelected = useRef(false);

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

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

    return (
      <>
        {!loading && inputValue && suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectedSuggestion(suggestion)}
                onKeyDown={(event) => handleKeyDown(event, suggestion)}
                tabIndex={0}
              >
                {renderSuggestion
                  ? renderSuggestion(suggestion)
                  : (typeof suggestion === "string" ||
                      typeof suggestion === "number") &&
                    suggestion}
              </li>
            ))}
          </ul>
        )}
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
          type="text"
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

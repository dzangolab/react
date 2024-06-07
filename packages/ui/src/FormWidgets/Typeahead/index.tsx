import { useEffect, useState } from "react";

import LoadingIcon from "../../LoadingIcon";
import { useDebouncedValue } from "../../utils";

type Properties<T> = {
  className?: string;
  data?: T[];
  disabled?: boolean;
  debounceTime?: number;
  value?: T;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  onSearch?: (value?: T) => void;
  onChange?: (value?: T) => void;
};

export const Typeahead = <T extends string | number>({
  className = "",
  data,
  disabled,
  debounceTime = 300,
  value,
  errorMessage,
  hasError,
  label,
  loading,
  name,
  placeholder,
  onChange,
  onSearch,
}: Properties<T>) => {
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState<T>((value || "") as T);
  const [selected, setSelected] = useState(false);
  const [hasInput, setHasInput] = useState(false);

  const debouncedValue = useDebouncedValue(inputValue, debounceTime);

  const handleSelectedSuggestion = (suggestion: T) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setSelected(true);
    if (onChange) {
      onChange(suggestion);
    }
  };

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  useEffect(() => {
    if (onSearch && debouncedValue !== "" && !selected && hasInput) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value as T;
    setInputValue(input);
    setHasInput(true);
    setSelected(false);
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
        {!loading && hasInput && inputValue && suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectedSuggestion(suggestion)}
                onKeyDown={(event) => handleKeyDown(event, suggestion)}
                tabIndex={0}
              >
                {suggestion}
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
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={loading ? "" : placeholder}
          disabled={disabled}
        />
        {loading && <LoadingIcon color="#ccc" />}
      </div>
      {renderSuggestions()}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

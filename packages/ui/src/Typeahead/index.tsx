import { useEffect, useState } from "react";

import { LoadingIcon, useDebouncedValue } from "..";

type Properties = {
  className?: string;
  data?: string[];
  disabled?: boolean;
  debounceTime?: number;
  value?: string;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
};

export const Typeahead = ({
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
}: Properties) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(value);
  const [selected, setSelected] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const debouncedValue = useDebouncedValue(inputValue, debounceTime);

  const handleSelectedSuggestion = (suggestion: string) => {
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
    if (
      onSearch &&
      debouncedValue !== "" &&
      debouncedValue.length >= 3 &&
      !selected
    ) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputValue(input);
    setHasInteracted(true);
    setSelected(false);
  };

  const renderSuggestions = () => {
    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLLIElement>,
      suggestion: string,
    ) => {
      if (event.key === "Enter" && !disabled) {
        handleSelectedSuggestion(suggestion);
      }
    };

    return (
      <>
        {!loading && hasInteracted && inputValue && suggestions.length > 0 && (
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
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={loading ? "" : placeholder}
        disabled={disabled}
        aria-invalid={hasError}
      />
      {loading && <LoadingIcon color="#ccc" />}
      {renderSuggestions()}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

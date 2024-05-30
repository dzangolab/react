import { useEffect, useState } from "react";

import { LoadingIcon, useDebouncedValue } from "..";

type Properties = {
  className?: string;
  data?: string[];
  disabled?: boolean;
  debounceTime?: number;
  defaultValue?: string;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  onSearch?: (value?: string) => void;
};

export const Typeahead = ({
  className = "",
  data,
  disabled,
  debounceTime = 300,
  defaultValue = "",
  errorMessage,
  hasError,
  label,
  loading,
  name,
  placeholder,
  onSearch,
}: Properties) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [selected, setSelected] = useState(false);

  const debouncedValue = useDebouncedValue(inputValue, debounceTime);

  const handleSelectedSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setSelected(true);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  useEffect(() => {
    if (inputValue !== "") {
      setSuggestions(data || []);
    }
  }, [data]);

  useEffect(() => {
    if (onSearch && debouncedValue !== "" && !selected) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputValue(input);

    let newSuggestions: string[] = [];

    if (input.length > 0 && data && !selected) {
      newSuggestions = data.filter((_value) =>
        _value.toLowerCase().startsWith(input.toLowerCase()),
      );
      setSuggestions(newSuggestions);
    }
    setSelected(false);
  };

  const renderSuggestions = () => {
    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLLIElement>,
      suggestion: string,
    ) => {
      if (event.key === "Enter" && !disabled) {
        setInputValue(suggestion);
        setSuggestions([]);
        setSelected(true);
      }
    };

    return (
      <>
        {!loading && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                className="suggestion"
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

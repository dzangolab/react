import { useEffect, useState } from "react";

import LoadingIcon from "../../LoadingIcon";
import { useDebouncedValue } from "../../utils";

type Properties = {
  className?: string;
  data?: string[];
  disabled?: boolean;
  debounceTime?: number;
  value?: string;
  emptyMessage?: string;
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
  data = [],
  disabled,
  debounceTime = 300,
  value = "",
  emptyMessage = "No results found",
  errorMessage,
  hasError,
  label,
  loading,
  name,
  placeholder,
  onChange,
  onSearch,
}: Properties) => {
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(loading);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(false);
  // const [hasInput, setHasInput] = useState(false);

  const debouncedValue = useDebouncedValue(inputValue, debounceTime);

  const handleSelectedSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    // setSuggestions([]);
    setSelected(true);

    if (onChange) {
      onChange(suggestion);
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     setSuggestions(data);
  //   }
  // }, [data]);

  useEffect(() => {
    if (loading !== loadingData) {
      setLoadingData(loading);
    }
  }, [loading]);

  useEffect(() => {
    if (onSearch && debouncedValue !== "" && !selected) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setInputValue(input);
    // setHasInput(true);
    setSelected(false);
    setLoadingData(true);
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
        {inputValue && !selected && (
          <ul>
            {data.length > 0 ? (
              data.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectedSuggestion(suggestion)}
                  onKeyDown={(event) => handleKeyDown(event, suggestion)}
                  tabIndex={0}
                >
                  {suggestion}
                </li>
              ))
            ) : loadingData ? (
              <></>
            ) : (
              <li>
                <span role="alert">{emptyMessage}</span>
              </li>
            )}
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
          value={value || inputValue}
          onChange={handleInputChange}
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

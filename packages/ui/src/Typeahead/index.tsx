import { useState } from "react";

import { LoadingIcon } from "..";

type Properties = {
  className?: string;
  data?: [];
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
};

export const Typeahead = ({
  loading,
  data,
  className,
  disabled,
  placeholder,
  value,
  onChange,
}: Properties) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleSelectedSuggestion = (suggestion: any) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    let newSuggestions: any = [];

    if (value.length > 0) {
      newSuggestions = data?.filter((_value: any) =>
        _value.toLowerCase().startsWith(value),
      );
    }

    setSuggestions(newSuggestions);
    onChange(value);
  };

  const renderSuggestions = () => {
    const handleKeyDown = (event: any, suggestion: any) => {
      if (event.key === "Enter" && !disabled) {
        onChange(suggestion);
        setSuggestions([]);
      }
    };

    return (
      <>
        {!loading && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion: any, index: any) => (
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
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={loading ? "" : placeholder}
        disabled={disabled}
      />
      {loading && <LoadingIcon color="#ccc" />}
      {renderSuggestions()}
    </div>
  );
};

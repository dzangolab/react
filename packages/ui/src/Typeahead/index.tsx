import { useEffect, useState } from "react";

import { LoadingIcon } from "..";

type Properties = {
  className?: string;
  data?: [];
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
};

export const Typeahead = ({
  className,
  data,
  disabled,
  label,
  loading,
  name,
  placeholder,
  onChange,
}: Properties) => {
  const [suggestions, setSuggestions] = useState<any>([]);
  const [value, setValue] = useState("");

  const handleSelectedSuggestion = (suggestion: any) => {
    setValue(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (onChange) {
      setSuggestions(data);
    }
  }, [data]);

  const handleInputChange = (event: any) => {
    if (onChange) {
      setValue(event.target.value);
      setSuggestions(data);
      onChange(event.target.value);
    } else {
      const value = event.target.value.toLowerCase();
      let newSuggestions: any = [];

      if (value.length > 0) {
        newSuggestions = data?.filter((_value: any) =>
          _value.toLowerCase().startsWith(value),
        );
      }
      setValue(value);
      setSuggestions(newSuggestions);
    }
  };
  const renderSuggestions = () => {
    const handleKeyDown = (event: any, suggestion: any) => {
      if (event.key === "Enter" && !disabled) {
        setValue(suggestion);
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
      {label && <label htmlFor={name}>{label}</label>}
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

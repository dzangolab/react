import { useEffect, useState } from "react";

import { LoadingIcon, useDebouncedValue } from "..";

type Properties = {
  className?: string;
  data: string[];
  disabled?: boolean;
  debounceTime: number;
  label?: string;
  loading?: boolean;
  name?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export const Typeahead = ({
  className,
  data,
  disabled,
  debounceTime,
  label,
  loading,
  name,
  placeholder,
  onChange,
}: Properties) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(false);

  const debouncedValue = useDebouncedValue(value, debounceTime);

  const handleSelectedSuggestion = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
    setSelected(true);
  };

  useEffect(() => {
    if (onChange) {
      setSuggestions(data);
    }
  }, [data]);

  useEffect(() => {
    if (onChange && debouncedValue !== "" && !selected) {
      onChange(debouncedValue);
    }

    if (!onChange && !selected) {
      let newSuggestions: string[] = [];

      if (debouncedValue.length > 0) {
        newSuggestions = data?.filter((_value) =>
          _value.toLowerCase().startsWith(debouncedValue.toLowerCase()),
        );
      }
      setSuggestions(newSuggestions);
    }
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setSelected(false);
  };

  const renderSuggestions = () => {
    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLLIElement>,
      suggestion: string,
    ) => {
      if (event.key === "Enter" && !disabled) {
        setValue(suggestion);
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

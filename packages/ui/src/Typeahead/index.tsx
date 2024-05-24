import { useState } from "react";

const suggestions: any = ["blue", "red", "yellow"];

export const Typeahead = ({ loading = false }) => {
  const [value, setValue] = useState("");

  const handleSelectedSuggestion = (suggestion: any) => {
    setValue(suggestion);
  };

  const handleInputChange = (event: any) => {
    setValue(event.target.value);
  };

  const renderSuggestions = () => {
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion: any, index: any) => (
              <li
                className="suggestion"
                key={index}
                onClick={() => handleSelectedSuggestion(suggestion)}
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
    <div className="dz-typeahead">
      <input type="text" value={value} onChange={handleInputChange} />
      {renderSuggestions()}
    </div>
  );
};

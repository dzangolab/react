import { useState } from "react";

interface ISelect {
  label?: string;
  multiple?: boolean;
  name: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (newValue: string[]) => void;
}

export const Select = ({
  label = "",
  multiple,
  name,
  options,
  value,
  onChange,
}: ISelect) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectedOption = (option: string) => {
    if (!multiple) {
      onChange([option]);
    } else {
      const newValue = value.includes(option) ? value : [...value, option];
      onChange(newValue);
    }
  };

  return (
    <div className={`select-input ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="select">
        <input type="text" value={value.join(", ")} readOnly />
        <span onClick={() => setShowOptions(!showOptions)}>
          <i className="pi pi-chevron-down"></i>
        </span>
      </div>

      {showOptions && (
        <div className="select-options">
          {options?.map((option, index) => {
            const { value, label } = option;
            return (
              <span
                key={index}
                onClick={() => handleSelectedOption(value)}
                style={{ cursor: "pointer" }}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

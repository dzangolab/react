import { useState } from "react";

interface ISelectProperties {
  disabled?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string[];
  onChange: (newValue: string[]) => void;
}

export const Select = ({
  disabled,
  label = "",
  multiple,
  name,
  options,
  placeholder,
  value,
  onChange,
}: ISelectProperties) => {
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
        <input
          type="text"
          value={value.join(", ")}
          readOnly
          disabled={disabled}
          placeholder={placeholder}
        />
        {value.length > 1 && (
          <span className="cancel" onClick={() => onChange([])} style={{}}>
            <i className="pi pi-times"></i>
          </span>
        )}
        <span onClick={() => setShowOptions(!showOptions)}>
          <i className="pi pi-chevron-down"></i>
        </span>
      </div>

      {showOptions && (
        <div className="select-options">
          {options?.map((option, index) => {
            const { value, label } = option;
            return (
              <span key={index} onClick={() => handleSelectedOption(value)}>
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

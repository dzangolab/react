import { useEffect, useRef, useState } from "react";

interface ISelectProperties {
  disabled?: boolean;
  hasError?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  value: (string | number)[];
  onChange: (newValue: (string | number)[]) => void;
}

export const Select = ({
  disabled,
  hasError,
  label = "",
  multiple,
  name,
  options,
  placeholder,
  value,
  onChange,
}: ISelectProperties) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        selectReference.current &&
        !selectReference.current.contains(event.target as HTMLElement)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selectReference]);

  const handleSelectedOption = (option: string | number) => {
    if (!multiple) {
      onChange([option]);
    } else {
      const newValue = value.includes(option) ? value : [...value, option];
      onChange(newValue);
    }
  };

  return (
    <div ref={selectReference} className={`dz-select ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={`input-field-select ${disabled ? "disabled" : ""}`.trimEnd()}
        aria-invalid={hasError}
      >
        <input
          type="text"
          value={
            value.length > 3
              ? `${value.length} items selected`
              : value.join(", ")
          }
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={hasError}
          onFocus={() => setShowOptions(true)}
        />
        {value.length > 1 && (
          <span className="remove-options" onClick={() => onChange([])}>
            <i className="pi pi-times"></i>
          </span>
        )}
        <span
          onClick={() => {
            disabled ? setShowOptions(false) : setShowOptions(!showOptions);
          }}
        >
          <i className="pi pi-chevron-down"></i>
        </span>
      </div>

      {showOptions && (
        <div className="select-field-options">
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

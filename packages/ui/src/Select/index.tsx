import { useEffect, useRef, useState } from "react";

import { Tag } from "..";

interface ISelectProperties<T> {
  disabled?: boolean;
  hasError?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: {
    value: T;
    label: string;
    disabled?: boolean;
    renderOption?: (option: T) => React.ReactNode;
  }[];
  placeholder?: string;
  value: T[];
  onChange: (newValue: T[]) => void;
}

export const Select = <T extends string | number>({
  disabled,
  hasError,
  label = "",
  multiple,
  name,
  options,
  placeholder,
  value,
  onChange,
}: ISelectProperties<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectReference = useRef<HTMLDivElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    { value: T; label: string }[]
  >([]);

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

  const handleSelectedOption = (option: { value: T; label: string }) => {
    if (!multiple) {
      onChange([option.value]);
      setSelectedOptions([option]);
    } else {
      const newValue = value.includes(option.value)
        ? value
        : [...value, option.value];
      onChange(newValue);
      setSelectedOptions(
        newValue
          .map((value_) => options.find((opt) => opt.value === value_))
          .filter((option) => option !== undefined)
          .map((option) => option as { value: T; label: string }),
      );
    }
  };

  const handleRemoveOption = (option: { value: T; label: string }) => {
    const updatedOptions = selectedOptions.filter(
      (opt) => opt.value !== option.value,
    );
    onChange(updatedOptions.map((opt) => opt.value));
    setSelectedOptions(updatedOptions);
  };

  return (
    <div ref={selectReference} className={`dz-select ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={`input-field-select ${disabled ? "disabled" : ""}`.trimEnd()}
        aria-invalid={hasError}
      >
        <input type="text" value={value.join(", ")} hidden readOnly />

        {selectedOptions && multiple ? (
          <div className="selected-options">
            {selectedOptions.map((option, index) => (
              <Tag
                key={index}
                renderContent={() => (
                  <>
                    <span>{option.label}</span>
                    <i
                      className="pi pi-times"
                      onClick={() => handleRemoveOption(option)}
                    ></i>
                  </>
                )}
                rounded
              />
            ))}
          </div>
        ) : (
          <span>{selectedOptions[0].label}</span>
        )}
        <span
          className="arrow"
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
            const { value, label, disabled, renderOption } = option;
            return (
              <span
                className={`${disabled ? "disabled-option" : ""}`}
                key={index}
                onClick={() => {
                  if (!disabled) {
                    handleSelectedOption(option);
                  }
                }}
              >
                {renderOption ? renderOption(value) : label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

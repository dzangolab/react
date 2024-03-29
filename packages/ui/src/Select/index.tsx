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
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        selectReference.current &&
        !selectReference.current.contains(event.target as HTMLElement)
      ) {
        setShowOptions(false);
        setClicked(false);
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
        newValue.map((value) => options.find((opt) => opt.value === value)!),
      );
    }
  };

  const handleRemoveOption = (option: { value: T; label: string }) => {
    const updatedOptions = selectedOptions.filter(
      (opt) => opt.value !== option.value,
    );
    onChange(updatedOptions.map((opt) => opt.value));
    setSelectedOptions(updatedOptions);
    setShowOptions(false);
  };

  return (
    <div ref={selectReference} className={`dz-select ${name}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={`input-field-select ${disabled ? "disabled" : ""} ${
          clicked ? "clicked" : ""
        }`.trimEnd()}
        aria-invalid={hasError}
      >
        <input
          type="text"
          readOnly
          disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setShowOptions(true);
            }
          }}
          onFocus={() => setClicked(true)}
          placeholder={selectedOptions.length > 0 ? "" : placeholder}
        />
        {selectedOptions.length > 0 && multiple ? (
          <div className="selected-options">
            {selectedOptions.length > 3 ? (
              <span>{`${selectedOptions.length} items selected`}</span>
            ) : (
              selectedOptions.map((option, index) => (
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
              ))
            )}
          </div>
        ) : (
          selectedOptions.length > 0 && (
            <span className="selected-options">
              {selectedOptions.length > 0 ? selectedOptions[0].label : ""}
            </span>
          )
        )}
        <span
          className="arrow"
          onClick={() => {
            if (!disabled) {
              setShowOptions(!showOptions);
              setClicked(true);
            }
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
                    setShowOptions(false);
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

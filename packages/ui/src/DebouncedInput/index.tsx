import { useEffect, useRef, useState } from "react";

import { useDebouncedValue } from "../utils";

import type { InputHTMLAttributes, ChangeEvent } from "react";

export interface DebouncedInputProperties
  extends InputHTMLAttributes<HTMLInputElement> {
  onInputChange: (value: string | number | readonly string[]) => void;
  debounceTime?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProperties> = ({
  onInputChange,
  debounceTime = 500,
  type = "text",
  className = "",
  defaultValue = "",
  ...inputProperties
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const isMounted = useRef(false);

  const debouncedValue = useDebouncedValue<string | number | readonly string[]>(
    inputValue,
    debounceTime,
  );

  useEffect(() => {
    if (isMounted.current) {
      onInputChange(debouncedValue);
    } else {
      isMounted.current = true;
    }
  }, [debouncedValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      className={`debounced-input ${className}`}
      type={type}
      value={inputValue}
      onChange={handleInputChange}
      {...inputProperties}
    />
  );
};

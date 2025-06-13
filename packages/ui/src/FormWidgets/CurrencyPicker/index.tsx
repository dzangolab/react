import React from "react";

import { Select, ISelectProperties, Option } from "../Select";

export type CurrencyPickerProperties<T> = ISelectProperties<T>;

export const CurrencyPicker = <T extends string | number = string>({
  options,
  ...properties
}: CurrencyPickerProperties<T>) => {
  const selectOptions = options.map((option) => ({
    label: option.label,
    value: option.value as T,
  }));

  const renderOptions = (option: Option<T>) => {
    return (
      <div className="currency-option">
        <span className="code">{option?.code}</span>
        <span className="label">{option?.label}</span>
        <span className="symbol">{option?.symbol}</span>
      </div>
    );
  };

  return (
    <Select
      className="currency-selector"
      options={selectOptions}
      renderOption={renderOptions}
      {...properties}
    />
  );
};

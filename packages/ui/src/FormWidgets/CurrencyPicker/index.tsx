import React from "react";

import { Select, ISelectProperties, Option } from "../Select";

export type CurrencyPickerProperties<T> = ISelectProperties<T>;

export const CurrencyPicker = <T extends string | number = string>({
  options,
  renderOption,
  ...properties
}: CurrencyPickerProperties<T>) => {
  const selectOptions = options.map((option) => ({
    code: option?.code,
    label: option.label,
    symbol: option?.symbol,
    value: option.value as T,
  }));

  const _renderOption = (option: Option<T>) => {
    if (renderOption) {
      return renderOption(option);
    }

    return (
      <div className="currency-picker-option">
        <span className="code">{option?.code}</span>
        <span className="label">{option?.label}</span>
        <span className="symbol">{option?.symbol}</span>
      </div>
    );
  };

  return (
    <Select
      className="currency-picker"
      menuOptions={{
        className: "currency-picker-menu",
      }}
      options={selectOptions}
      renderOption={_renderOption}
      {...properties}
    />
  );
};

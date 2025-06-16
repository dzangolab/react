import React from "react";

import { Select, ISelectProperties } from "../Select";

export type CurrencyPicker<T> = {
  code?: string;
  disabled?: boolean;
  label: string;
  symbol?: string;
  value: T;
};

export type CurrencyPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options" | "renderOption" | "multiple" | "value" | "onChange"
> & {
  options: CurrencyPicker<T>[];
  renderOption?: (option: CurrencyPicker<T>) => React.ReactNode;
} & (
    | {
        multiple: true;
        value: T[];
        onChange: (newValue: T[]) => void;
      }
    | {
        multiple?: false;
        value: T;
        onChange: (newValue: T) => void;
      }
  );

export const CurrencyPicker = <T extends string | number>({
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

  const _renderOption = (option: CurrencyPicker<T>) => {
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

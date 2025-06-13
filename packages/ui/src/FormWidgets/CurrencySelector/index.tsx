import React from "react";

import { Select, ISelectProperties } from "../Select";

type Option<T> = {
  disabled?: boolean;
  label: string;
  value: T;
};

export type CurrencyOption = {
  code: string;
  label: string;
  symbol: string;
  value: string;
};

export type CurrencySelectorProperties<T extends string | number> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  currencyOptions: CurrencyOption[];
} & (
    | {
        multiple?: false;
        value: T;
        onChange: (value: T) => void;
      }
    | {
        multiple: true;
        value: T[];
        onChange: (value: T[]) => void;
      }
  );

export const CurrencySelector = <T extends string | number = string>({
  currencyOptions,
  ...properties
}: CurrencySelectorProperties<T>) => {
  const selectOptions = currencyOptions.map((currency) => ({
    label: currency.label,
    value: currency.value as T,
  }));

  const renderOptions = (option: Option<T>) => {
    const currencyOption = currencyOptions.find(
      (currency) => currency.value === option.value,
    );

    return (
      <div className="currency-option">
        <span className="code">{currencyOption?.code}</span>
        <span className="label">{currencyOption?.label}</span>
        <span className="symbol">{currencyOption?.symbol}</span>
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

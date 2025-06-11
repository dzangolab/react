import React from "react";

import { Select, ISelectProperties } from "../Select";

export type CurrencyOption = {
  code: string;
  label: string;
  symbol: string;
  value: string;
};

type CurrencySelectorProperties<T extends string | number> = Omit<
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
  label,
  name,
  currencyOptions,
  placeholder,
  renderValue,
  ...properties
}: CurrencySelectorProperties<T>) => {
  const selectOptions = currencyOptions.map((currency) => ({
    label: currency.label,
    value: currency.value as T,
  }));

  return (
    <Select
      className="currency-selector"
      name={name}
      label={label}
      options={selectOptions}
      placeholder={placeholder}
      renderOption={(option) => {
        const currencyOption = currencyOptions.find(
          (currency) => currency.value === option.value,
        );

        return (
          <div className="currency-label">
            <span className="code">{currencyOption?.code}</span>
            <span>{currencyOption?.label}</span>
            <span className="currency-symbol">{currencyOption?.symbol}</span>
          </div>
        );
      }}
      renderValue={renderValue}
      {...properties}
    />
  );
};

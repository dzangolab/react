import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import React from "react";

import { ErrorMessage } from "../ErrorMessage";

interface App {
  name: string;
  id: number;
  origin: string;
}

interface IProperties {
  name: string;
  value: App;
  label?: string;
  placeholder?: string;
  onChange: (app: App) => void;
  inputRef: React.Ref<HTMLInputElement>;
  options: App[];
  error?: any;
}

export const AppPickerBasic = ({
  name,
  value,
  label,
  placeholder,
  onChange,
  inputRef,
  options,
  error,
}: IProperties) => {
  return (
    <div className={`field ${name}`}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <Dropdown
        id={name}
        value={value}
        optionLabel="name"
        placeholder={placeholder}
        options={options}
        focusInputRef={inputRef}
        onChange={(event) => onChange(event.value)}
        className={classNames({ "p-invalid": error })}
        appendTo="self"
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

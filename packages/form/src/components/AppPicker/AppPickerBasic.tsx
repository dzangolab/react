import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import React from "react";

import { ErrorMessage } from "../ErrorMessage";
import { RoleOption } from "../RolePicker";
import { ErrorOption } from "react-hook-form";

export interface AppOption {
  id: number;
  name: string;
  origin: string;
  supportedRoles?: RoleOption[];
}

interface IProperties {
  error?: ErrorOption;
  inputRef: React.Ref<HTMLInputElement>;
  label?: string;
  name: string;
  options: AppOption[];
  placeholder?: string;
  value: AppOption;
  onChange: (app: AppOption) => void;
}

export const AppPickerBasic = ({
  error,
  inputRef,
  label,
  name,
  options,
  placeholder,
  value,
  onChange,
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
        disabled={!options?.length || options.length === 1}
        focusInputRef={inputRef}
        onChange={(event) => onChange(event.value)}
        className={classNames({ "p-invalid": error })}
        appendTo="self"
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

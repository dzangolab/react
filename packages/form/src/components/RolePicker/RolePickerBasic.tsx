import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import React from "react";

import { ErrorMessage } from "../ErrorMessage";

import type { ErrorOption } from "react-hook-form";

interface Role {
  name: string;
  id: number;
}

interface IProperties {
  name: string;
  value: Role;
  label?: string;
  placeholder?: string;
  onChange: (role: Role) => void;
  inputRef: React.Ref<HTMLInputElement>;
  options: Role[];
  error?: ErrorOption;
}

export const RolePickerBasic = ({
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
        disabled={!options?.length || options.length === 1}
        focusInputRef={inputRef}
        onChange={(event) => onChange(event.value)}
        className={classNames({ "p-invalid": error })}
        appendTo="self"
      />
      {error?.message && value && <ErrorMessage message={error.message} />}
    </div>
  );
};

import {
  CustomInputProperties,
  ErrorMessage,
  UseFormRegister,
} from "@dzangolab/react-form";
import React from "react";

interface IProperties extends Pick<CustomInputProperties, "getFieldState"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  checked?: boolean;
  handleChange?: () => void;
  hasCheckbox?: boolean;
  label: React.ReactNode;
  name: string;
}

const TermsAndConditions: React.FC<IProperties> = ({
  hasCheckbox = true,
  label,
  name,
  getFieldState,
  register,
  ...others
}) => {
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);

  return hasCheckbox ? (
    <div className={`field ${name}`}>
      <div className={"input-field-checkbox"}>
        <input
          {...(register ? register(name) : undefined)}
          id={name}
          type="checkbox"
          aria-invalid={invalid}
          name={name}
          {...others}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  ) : (
    <p className={name} aria-label={name}>
      {label}
    </p>
  );
};

export default TermsAndConditions;

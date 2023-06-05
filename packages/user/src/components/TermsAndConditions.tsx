import { UseFormRegister } from "@dzangolab/react-form";
import React from "react";

interface IProperties {
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
  register,
  ...others
}) => {
  return hasCheckbox ? (
    <label htmlFor={name}>
      <input
        {...(register ? register(name) : undefined)}
        id={name}
        type="checkbox"
        name={name}
        {...others}
      />
      {label}
    </label>
  ) : (
    <p aria-label={name}>{label}</p>
  );
};

export default TermsAndConditions;

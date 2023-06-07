import { UseFormRegister } from "@dzangolab/react-form";
import React from "react";

interface IProperties {
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
  register,
  ...others
}) => {
  return hasCheckbox ? (
    <div className={`field ${name}`}>
      <input
        {...(register ? register(name) : undefined)}
        id={name}
        type="checkbox"
        name={name}
        {...others}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  ) : (
    <p className={name} aria-label={name}>
      {label}
    </p>
  );
};

export default TermsAndConditions;

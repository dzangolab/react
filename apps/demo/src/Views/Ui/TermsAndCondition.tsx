import React from "react";

import "./termsAndCondition.css";

interface IProperties {
  handleChange?: () => void;
  checked?: boolean;
  label?: string;
  name: string;
  hasCheckbox?: boolean;
}

const TermsAndCondition: React.FC<IProperties> = ({
  label = "I agree to the terms and conditions.",
  name,
  hasCheckbox = true,
  checked,
  handleChange,
}) => {
  return hasCheckbox ? (
    <label htmlFor={name}>
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  ) : (
    <p aria-label={name}>{label}</p>
  );
};

export default TermsAndCondition;

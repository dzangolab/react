import { useState } from "react";

interface ISelect {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label = "", name, options }: ISelect) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={`select-input ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="select">
        <input type="text" readOnly />
        <span onClick={() => setShowOptions(!showOptions)}>
          <i className="pi pi-chevron-down"></i>
        </span>
      </div>
      <div className={showOptions ? "select-options" : ""}>
        {showOptions &&
          options?.map((option, index) => {
            const { value, label } = option;
            return (
              <span key={index} style={{ cursor: "pointer" }}>
                {label}
              </span>
            );
          })}
      </div>
    </div>
  );
};

import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  name?: string;
}

const Input = ({
  type,
  label,
  name,
  placeholder,
  onChange,
  ...others
}: IInputProperties) => {
  return (
    <div className={`input-field ${name}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...others}
      />
      {}
    </div>
  );
};

export default Input;

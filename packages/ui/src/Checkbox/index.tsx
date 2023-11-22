import { InputHTMLAttributes } from "react";
interface CheckboxProperties extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProperties> = ({
  name,
  label,
  onChange,
  ...others
}) => {
  return (
    <div className="check-box-wrapper">
      <input
        {...others}
        id={name}
        type="checkbox"
        name={name}
        onChange={onChange}
      />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default Checkbox;

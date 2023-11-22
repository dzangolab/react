import { InputHTMLAttributes } from "react";
interface CheckboxProperties extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const Checkbox: React.FC<CheckboxProperties> = ({
  name,
  label,
  onChange,
  errorMessage,
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Checkbox;

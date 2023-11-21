type CheckboxProperties = {
  register?: any;
  name?: string;
  label?: string;
  checked?: boolean;
  handleChange?: () => void;
};

const Checkbox: React.FC<CheckboxProperties> = ({
  register,
  name,
  label,
  handleChange,
  ...others
}) => {
  return (
    <div className="check-box-wrapper">
      <input
        id={name}
        type="checkbox"
        {...(register ? register(name) : undefined)}
        name={name}
        onChange={handleChange}
        {...others}
      />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default Checkbox;

type CheckboxProperties = {
  name?: string;
  label?: string;
  checked?: boolean;
  handleChange: () => void;
};

const Checkbox: React.FC<CheckboxProperties> = ({
  name,
  label,
  handleChange,
  ...others
}) => {
  return (
    <div className="check-box-wrapper">
      <input type="checkbox" name={name} onChange={handleChange} {...others} />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default Checkbox;

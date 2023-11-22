type CheckboxProperties = {
  checked?: boolean;
  handleChange?: () => void;
  label: string;
  name?: string;
  register?: any;
};

const Checkbox: React.FC<CheckboxProperties> = ({
  register,
  name,
  label,
  ...others
}) => {
  return (
    <div className="check-box-wrapper">
      <input
        id={name}
        type="checkbox"
        {...(register ? register(name) : undefined)}
        name={name}
        {...others}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;

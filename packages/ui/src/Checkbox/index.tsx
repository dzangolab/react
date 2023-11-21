type CheckBoxProperties = {
  name?: string;
  label?: string;
  checked: boolean;
  handleChange: () => void;
};

const CheckBox: React.FC<CheckBoxProperties> = ({
  name,
  label,
  handleChange,
  checked,
}) => {
  return (
    <div className={`field ${name}`}>
      <input
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={checked}
      />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default CheckBox;

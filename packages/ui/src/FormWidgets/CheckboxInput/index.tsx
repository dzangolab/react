import { Checkbox, ICheckboxProperties } from "../Checkbox";

interface IOption {
  label: string;
  value: string;
}
export interface ICheckboxInputProperties extends ICheckboxProperties {
  options: IOption[];
}

export const CheckboxInput: React.FC<ICheckboxInputProperties> = ({
  className = "",
  disabled,
  errorMessage,
  helperText,
  label = "",
  onChange,
  options,
}) => {
  return (
    <fieldset className={`field ${className}`.trim()}>
      <legend>{label}</legend>
      {options?.map(({ label: optionLabel, value: optionValue }) => (
        <Checkbox
          disabled={disabled}
          key={optionValue}
          label={optionLabel}
          name={optionValue}
          onChange={onChange}
          value={optionValue}
        />
      ))}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </fieldset>
  );
};

import { ErrorMessage } from "./ErrorMessage";
import { CustomInputProperties } from "../types";

export type IDaysInputField = CustomInputProperties &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

export const DaysInput: React.FC<IDaysInputField> = ({
  className = "",
  getFieldState,
  label = "",
  name,
  placeholder,
  register,
  ...others
}) => {
  if (!register || !getFieldState) return null;

  const updatedRegister = register(name, {
    setValueAs: (value) => {
      if (!value?.trim() || isNaN(value)) {
        return undefined;
      }

      if (Number(value) <= 0) {
        return undefined;
      }

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + Number(value));

      return currentDate;
    },
  });

  const { error, isDirty, isTouched, invalid } = getFieldState(name);

  let inputClassName = "";
  if (isDirty && !invalid) inputClassName = "valid";
  if (isTouched && invalid) inputClassName = "invalid";

  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}
      <input
        {...updatedRegister}
        id={`input-field-${name}`}
        className={inputClassName}
        type="number"
        placeholder={placeholder}
        {...others}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  );
};

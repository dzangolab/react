import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  severity?: string;
  variant?: string;
  icon?: string | ReactNode;
  loading?: boolean;
  iconPosition?: string;
}

export const Button: FC<IButtonProperties> = ({
  label,
  severity,
  variant,
  icon,
  loading,
  disabled,
  iconPosition,
  onClick,
  ...otherProperties
}) => {
  return (
    <button onClick={onClick} disabled={disabled} {...otherProperties}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

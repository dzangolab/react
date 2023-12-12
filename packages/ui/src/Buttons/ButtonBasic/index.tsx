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
  const renderIcon = () => {
    return (
      <span>{typeof icon === "string" ? <i className={icon} /> : icon}</span>
    );
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${severity} ${variant}`}
      {...otherProperties}
    >
      {renderIcon()}
      <span>{label}</span>
    </button>
  );
};

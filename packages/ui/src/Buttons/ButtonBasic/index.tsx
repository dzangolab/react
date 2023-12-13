import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  severity?: "primary" | "secondary" | "danger" | "success";
  variant?: "outlined" | "filled";
  icon?: string | ReactNode;
  loading?: boolean;
  iconPosition?: "left" | "right";
}

export const Button: FC<IButtonProperties> = ({
  label,
  severity = "primary",
  variant,
  icon,
  loading,
  disabled,
  iconPosition = "left",
  onClick,
  ...otherProperties
}) => {
  const renderIcon = () => {
    return (
      <span className="button-icon">
        {typeof icon === "string" ? <i className={icon} /> : icon}
      </span>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`button ${severity} ${variant} ${iconPosition}`}
      {...otherProperties}
    >
      {renderIcon()}
      <span className="button-label">{label}</span>
    </button>
  );
};

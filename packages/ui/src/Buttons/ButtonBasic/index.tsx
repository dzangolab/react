import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import LoadingIcon from "../../LoadingIcon";

interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  severity?: "primary" | "secondary" | "alternate";
  variant?: "outlined" | "filled";
  icon?: string | ReactNode;
  loading?: boolean;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "large";
}

export const Button: FC<IButtonProperties> = ({
  label = "Button",
  severity = "primary",
  variant = "filled",
  icon,
  loading,
  disabled,
  iconPosition = "left",
  size = "medium",
  onClick,
  ...otherProperties
}) => {
  const renderIcon = () => {
    return (
      <span className="button-icon">
        {loading ? (
          <LoadingIcon />
        ) : typeof icon === "string" ? (
          <i className={icon} />
        ) : (
          icon
        )}
      </span>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`button ${severity} ${variant} ${iconPosition} ${size}`}
      {...otherProperties}
    >
      {renderIcon()}
      <span className="button-label">{label}</span>
    </button>
  );
};

import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  severity?: "primary" | "secondary" | "alternate";
  variant?: "outlined" | "filled";
  icon?: string | ReactNode;
  loading?: boolean;
  loadingIcon?: string | ReactNode;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "large";
}

export const Button: FC<IButtonProperties> = ({
  label,
  severity = "primary",
  variant = "filled",
  icon,
  loading,
  loadingIcon,
  disabled,
  iconPosition = "left",
  size = "medium",
  onClick,
  ...otherProperties
}) => {
  const renderIcon = () => {
    if (!icon && !loadingIcon) {
      return null;
    }

    const renderContent = () => {
      if (loading && loadingIcon) {
        if (typeof loadingIcon === "string")
          return <i className={loadingIcon} />;
        return loadingIcon;
      }

      if (icon && typeof icon === "string") return <i className={icon} />;

      return icon;
    };

    return <span className="button-icon">{renderContent()}</span>;
  };

  const renderLabel = () => {
    if (label) {
      return <span className="button-label">{label}</span>;
    }

    return null;
  };

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`button ${severity} ${variant} ${iconPosition} ${size}`}
      {...otherProperties}
    >
      {renderIcon()}
      {renderLabel()}
    </button>
  );
};

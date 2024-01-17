import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Link } from "react-router-dom";

export interface IButtonProperties
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  severity?:
    | "primary"
    | "secondary"
    | "alternate"
    | "success"
    | "danger"
    | "warning";
  variant?: "outlined" | "filled";
  iconLeft?: string | ReactNode;
  iconRight?: string | ReactNode;
  loading?: boolean;
  loadingIcon?: string | ReactNode;
  size?: "small" | "medium" | "large";
  to?: string;
}

export const Button: FC<IButtonProperties> = ({
  label,
  severity = "primary",
  variant = "filled",
  iconLeft,
  iconRight,
  loading,
  disabled,
  size = "medium",
  onClick,
  className = "",
  to,
  ...otherProperties
}) => {
  const buttonClassName = ["dz-button", className, severity, variant, size]
    .filter(Boolean)
    .join(" ");

  const renderIconLeft = () => {
    if (!iconLeft) {
      return null;
    }

    return (
      <span className="icon-left">
        {typeof iconLeft === "string" ? <i className={iconLeft} /> : iconLeft}
      </span>
    );
  };

  const renderLabel = () => {
    if (!label) {
      return null;
    }

    return <span className="label">{label}</span>;
  };

  const renderIconRight = () => {
    if (!iconRight) {
      return null;
    }

    return (
      <span className="icon-right">
        {typeof iconRight === "string" ? (
          <i className={iconRight} />
        ) : (
          iconRight
        )}
      </span>
    );
  };

  const renderButton = () => {
    return (
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className={buttonClassName}
        {...otherProperties}
      >
        {renderIconLeft()}
        {renderLabel()}
        {renderIconRight()}
      </button>
    );
  };

  return to ? <Link to={to}>{renderButton()}</Link> : renderButton();
};

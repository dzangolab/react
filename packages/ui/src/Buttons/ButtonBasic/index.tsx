import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Link } from "react-router-dom";

export interface IButtonProperties
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: string | ReactNode;
  iconRight?: string | ReactNode;
  label?: string;
  loading?: boolean;
  severity?:
    | "primary"
    | "secondary"
    | "alternate"
    | "success"
    | "danger"
    | "warning";
  size?: "small" | "medium" | "large";
  to?: string;
  variant?: "outlined" | "filled";
}

export const Button: FC<IButtonProperties> = ({
  className = "",
  disabled,
  iconLeft,
  iconRight,
  label,
  loading,
  onClick,
  severity = "primary",
  size = "medium",
  to,
  variant = "filled",
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

  const renderButton = (role: string) => {
    return (
      <button
        role={role}
        className={buttonClassName}
        disabled={loading || disabled}
        onClick={onClick}
        {...otherProperties}
      >
        {renderIconLeft()}
        {renderLabel()}
        {renderIconRight()}
      </button>
    );
  };

  return to ? (
    <Link to={to} className="dz-button-link">
      {renderButton("link")}
    </Link>
  ) : (
    renderButton("button")
  );
};

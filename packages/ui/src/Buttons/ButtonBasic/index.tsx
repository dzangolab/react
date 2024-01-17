import { ButtonHTMLAttributes, FC, ReactNode } from "react";

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
  variant?: "outlined" | "filled" | "textOnly";
  iconLeft?: string | ReactNode;
  iconRight?: string | ReactNode;
  loading?: boolean;
  loadingIcon?: string | ReactNode;
  size?: "small" | "medium" | "large";
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

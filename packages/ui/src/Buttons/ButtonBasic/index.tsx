import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  severity?: "primary" | "secondary" | "alternate";
  variant?: "outlined" | "filled";
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
  ...otherProperties
}) => {
  const renderIconLeft = () => {
    if (!iconLeft) {
      return null;
    }

    return (
      <span className="button-icon-left">
        {typeof iconLeft === "string" ? <i className={iconLeft} /> : iconLeft}
      </span>
    );
  };

  const renderLabel = () => {
    if (!label) {
      return null;
    }

    return <span className="button-label">{label}</span>;
  };

  const renderIconRight = () => {
    if (!iconRight) {
      return null;
    }

    return (
      <span className="button-icon-right">
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
      className={`dz-button ${severity} ${variant} ${size}`}
      {...otherProperties}
    >
      {renderIconLeft()}
      {renderLabel()}
      {renderIconRight()}
    </button>
  );
};

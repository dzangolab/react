import { FC, ReactNode } from "react";

type TagProperties = {
  className?: string;
  color?: string;
  icon?: string;
  label?: string;
  renderContent?: () => ReactNode;
};

export const Tag: FC<TagProperties> = ({
  className = "",
  color = "#c1f5c3",
  icon,
  label,
  renderContent,
}) => {
  const tagStyle = {
    backgroundColor: color,
  };

  const renderIcon = () => {
    if (!icon) {
      return null;
    }

    return (
      <span className="icon">
        <i className={icon} />
      </span>
    );
  };

  return (
    <div className={`dz-tag ${className}`.trimEnd()} style={tagStyle}>
      {renderContent ? (
        renderContent()
      ) : (
        <>
          {renderIcon()}
          {label}
        </>
      )}
    </div>
  );
};

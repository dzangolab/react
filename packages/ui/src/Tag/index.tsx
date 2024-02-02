import { FC, ReactNode } from "react";

import { tagColors } from "./TagColor";

type TagProperties = {
  className?: string;
  color?: string;
  icon?: string;
  label?: string;
  renderContent?: () => ReactNode;
};

export const Tag: FC<TagProperties> = ({
  className = "",
  color = "default",
  icon,
  label,
  renderContent,
}) => {
  const tagStyle = {
    backgroundColor: tagColors[color] || color,
  };

  const renderIcon = () => {
    if (!icon) {
      return null;
    }

    return (
      <span className="tag-icon">
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

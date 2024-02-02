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

  return (
    <span className={`dz-tag ${className}`.trimEnd()} style={tagStyle}>
      {renderContent ? (
        renderContent()
      ) : (
        <>
          {icon && <i className={icon}></i>}
          {label && label}
        </>
      )}
    </span>
  );
};

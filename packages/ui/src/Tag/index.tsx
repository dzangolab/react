import { FC, ReactNode } from "react";

import { tagColors } from "./TagColors";

type TagProperties = {
  className?: string;
  color?: string;
  fullWidth?: boolean;
  icon?: string;
  label?: string;
  rounded?: boolean;
  style?: React.CSSProperties;
  renderContent?: () => ReactNode;
};

export const Tag: FC<TagProperties> = ({
  className = "",
  color = "default",
  fullWidth,
  icon,
  label,
  rounded,
  style,
  renderContent,
}) => {
  const tagStyle = {
    ...style,
    backgroundColor: tagColors[color] || color,
  };

  return (
    <span
      className={`dz-tag ${className} ${rounded ? "rounded" : ""} ${
        fullWidth ? "full-width" : ""
      }`.trimEnd()}
      style={tagStyle}
    >
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

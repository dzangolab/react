import { FC, ReactNode } from "react";
import { tagColors } from "./TagColors";

type TagProperties = {
  className?: string;
  color?: string;
  icon?: string;
  label?: string;
  rounded?: boolean;
  renderContent?: () => ReactNode;
};

export const Tag: FC<TagProperties> = ({
  className = "",
  color = "default",
  icon,
  label,
  rounded,
  renderContent,
}) => {
  const tagStyle = {
    backgroundColor: tagColors[color] || color,
  };

  return (
    <span
      className={`dz-tag ${className} ${rounded ? "rounded" : ""}`.trimEnd()}
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

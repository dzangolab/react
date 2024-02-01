import { FC, ReactNode } from "react";

type TagProperties = {
  className?: string;
  icon?: string;
  label?: string;
  renderContent?: () => ReactNode;
};

export const Tag: FC<TagProperties> = ({
  className = "",
  icon,
  label,
  renderContent,
}) => {
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
    <div className={`dz-tag ${className}`.trimEnd()}>
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

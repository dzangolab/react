type TagProperties = {
  className?: string;
  icon?: string;
  label?: string;
  renderContent?: () => React.ReactNode;
};

export const Tag: React.FC<TagProperties> = ({
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
    <span className={`dz-tag ${className}`.trimEnd()}>
      {renderIcon()}
      {label}
      {renderContent && renderContent()}
    </span>
  );
};
